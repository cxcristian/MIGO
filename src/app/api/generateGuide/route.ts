import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import jsPDF from "jspdf";
import autoTable, { RowInput, UserOptions } from "jspdf-autotable";

// ✅ Extender jsPDF para incluir lastAutoTable (sin usar any)
interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable?: {
    finalY: number;
  };
}

// ✅ Definir interfaces
interface Note {
  subject: string;
  content: string;
}

interface GenerateGuideRequest {
  prompt?: string;
  notes: Note[];
  apiKey?: string;
}

export async function POST(request: Request) {
  try {
    const body: GenerateGuideRequest = await request.json();
    const { prompt, notes, apiKey } = body;

    const geminiApiKey = apiKey || process.env.GEMINI_API_KEY;

    if (!geminiApiKey) {
      return NextResponse.json(
        { error: "No API key provided" },
        { status: 400 }
      );
    }

    if (!Array.isArray(notes) || notes.length === 0) {
      return NextResponse.json(
        { error: "No se proporcionaron notas válidas" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const notesContent = notes
      .map((n) => `Materia: ${n.subject}\nNota: ${n.content}`)
      .join("\n\n");

    const fullPrompt = `
Eres un asistente educativo experto. Tu tarea es crear una guía de estudio clara y organizada 
basada en las notas del estudiante y su instrucción adicional.

--- NOTAS ---
${notesContent}
--- FIN DE NOTAS ---

--- PROMPT ADICIONAL ---
${prompt || "(No se proporcionó ninguna instrucción adicional)"}
--- FIN DE PROMPT ADICIONAL ---

La guía debe estar estructurada con títulos, subtítulos, viñetas, y tablas si es necesario. 
El formato de salida debe ser Markdown.
`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const guideText = response.text();

    // ✅ Generar PDF
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    }) as jsPDFWithAutoTable;

    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let cursorY = margin;

    const checkAndAddPage = (heightNeeded: number) => {
      if (cursorY + heightNeeded > pageHeight - margin) {
        doc.addPage();
        cursorY = margin;
      }
    };

    const writeWrappedText = (text: string, fontSize = 12, bold = false) => {
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", bold ? "bold" : "normal");
      const splitText = doc.splitTextToSize(
        text,
        pageWidth - margin * 2
      ) as string[];
      splitText.forEach((line: string) => {
        checkAndAddPage(8);
        doc.text(line, margin, cursorY);
        cursorY += 7;
      });
    };

    const lines = guideText.split("\n");
    let isTable = false;
    let tableHeaders: string[] = [];
    let tableBody: RowInput[] = [];

    for (const line of lines) {
      if (isTable) {
        if (line.trim() === "") {
          isTable = false;

          const options: UserOptions = {
            head: [tableHeaders],
            body: tableBody,
            startY: cursorY,
            margin: { left: margin },
            styles: { fontSize: 10 },
            headStyles: { fillColor: [105, 210, 205] },
          };

          autoTable(doc, options);

          cursorY = doc.lastAutoTable
            ? doc.lastAutoTable.finalY + 10
            : cursorY + 10;
          tableHeaders = [];
          tableBody = [];
        } else if (line.startsWith("|---")) {
          continue;
        } else {
          tableBody.push(
            line
              .split("|")
              .filter((c) => c.length > 0)
              .map((item) => item.trim())
          );
        }
        continue;
      }

      if (line.startsWith("# ")) {
        checkAndAddPage(14);
        writeWrappedText(line.substring(2), 22, true);
        cursorY += 4;
      } else if (line.startsWith("## ")) {
        checkAndAddPage(12);
        writeWrappedText(line.substring(3), 18, true);
        cursorY += 3;
      } else if (line.startsWith("### ")) {
        checkAndAddPage(10);
        writeWrappedText(line.substring(4), 14, true);
      } else if (line.startsWith("---")) {
        checkAndAddPage(5);
        doc.setDrawColor(105, 210, 205);
        doc.setLineWidth(1);
        doc.line(margin, cursorY, pageWidth - margin, cursorY);
        cursorY += 5;
      } else if (line.startsWith("|")) {
        isTable = true;
        tableHeaders = line
          .split("|")
          .filter((c) => c.length > 0)
          .map((item) => item.trim());
      } else if (line.startsWith("* ") || line.startsWith("- ")) {
        const bulletText = `• ${line.substring(2)}`;
        writeWrappedText(bulletText, 12);
        cursorY += 2;
      } else {
        writeWrappedText(line, 12);
      }
    }

    const pdfBuffer = doc.output("arraybuffer");

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="study-guide.pdf"',
      },
    });
  } catch (error) {
    console.error("Error in generateGuide API route:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate guide";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
