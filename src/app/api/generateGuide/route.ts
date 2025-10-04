import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import jsPDF from 'jspdf';

// ✅ 1. Inicializa el cliente fuera del handler (mejor rendimiento)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(request: Request) {
  try {
    // ✅ 2. Leer y validar datos
    const body = await request.json();
    const { prompt, notes } = body;

    if (!Array.isArray(notes) || notes.length === 0) {
      return NextResponse.json({ error: 'No se proporcionaron notas válidas' }, { status: 400 });
    }

    // ✅ 3. Construir el prompt completo para Gemini
    const notesContent = notes
      .map((n: { subject: string; content: string }) => `Materia: ${n.subject}\nNota: ${n.content}`)
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

La guía debe estar estructurada con títulos, subtítulos y viñetas. 
Debe tener un tono educativo y fácil de entender.
`;

    // ✅ 4. Llamar a Gemini
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const guideText = response.text();

    // ✅ 5. Generar el PDF
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const margin = 10;
    const maxWidth = 190;

    const lines = doc.splitTextToSize(guideText, maxWidth);
    doc.text(lines, margin, margin);

    const pdfBuffer = doc.output("arraybuffer");

    // ✅ 6. Devolver el PDF
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="study-guide.pdf"',
      },
    });

  } catch (error) {
    console.error("Error in generateGuide API route:", error);
    const message = error instanceof Error ? error.message : "Failed to generate guide";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
