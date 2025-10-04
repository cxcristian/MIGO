import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);

// Asegúrate de que la clave de API no sea undefined antes de usarla
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY no encontrada en el archivo .env");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Usando 'gemini-pro' que es más estándar
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

try {
  const result = await model.generateContent("como estas estimada ia, sabes que pronto te integrare a un proyecto llamado MIGO? muy interesante la verdad");
  const response = await result.response;
  console.log(response.text());
} catch (error) {
  console.error("Error al llamar a la API de Gemini:", error);
}