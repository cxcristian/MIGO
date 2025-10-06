"use client";

import { useState } from 'react';
import ApiKeyModal from '../ApiKeyModal/ApiKeyModal';

interface Note {
  subject: string;
  content: string;
}

interface PdfGuideGeneratorProps {
  prompt: string;
  notes: Note[];
}

export default function PdfGuideGenerator({ prompt, notes }: PdfGuideGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerate = async () => {
    const apiKey = localStorage.getItem('gemini-api-key');
    if (!apiKey) {
      setIsModalOpen(true);
      return;
    }

    if (notes.length === 0) {
      alert('Por favor, agrega al menos una nota para generar la guía.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/generateGuide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, notes, apiKey }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.error || `Failed to generate guide. Status: ${response.status}`;
        throw new Error(errorMessage);
      }

      // The response is a PDF file, so we handle it as a blob
      const blob = await response.blob();
      
      // Create a link to download the PDF
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'guia-de-estudio.pdf';
      document.body.appendChild(a);
      a.click();
      
      // Clean up the URL object and the link
      window.URL.revokeObjectURL(url);
      a.remove();

    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Ocurrió un error al generar la guía. Por favor, intenta de nuevo.';
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <aside className="md:w-1/5 bg-gray-50 p-4 rounded-lg shadow flex flex-col">
        <h2 className="text-lg font-semibold text-[#294380] text-center">
          Guías PDF
        </h2>

        {/* The text preview is no longer needed as the PDF is downloaded directly */}

        <div className="mt-auto flex justify-end">
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none disabled:bg-gray-400"
            onClick={handleGenerate}
            disabled={isLoading}
          >
            {isLoading ? 'Generando...' : 'Generar Guía'}
          </button>
        </div>
      </aside>
      <ApiKeyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
