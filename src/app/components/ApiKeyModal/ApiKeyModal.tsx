"use client";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApiKeyModal({ isOpen, onClose }: ApiKeyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-[#294380] mb-4">API Key Requerida</h2>
        <p className="text-gray-700 mb-4">
          Por favor, ingresa tu API Key de Google AI Studio para generar la guía.
        </p>
        <div className="text-gray-700 mb-4">
          <p className="font-semibold">Instrucciones:</p>
          <ol className="list-decimal list-inside">
            <li>Haz clic en el ícono de la llave en la barra de navegación.</li>
            <li>Pega tu API Key y guárdala.</li>
          </ol>
        </div>
        <p className="text-gray-700 mb-6">
          Puedes obtener tu API Key en:{' '}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#69d2cd] hover:underline"
          >
            Google AI Studio
          </a>
        </p>
        <button
          onClick={onClose}
          className="w-full bg-[#294380] text-white py-2 rounded-md hover:bg-[#3b5fb7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#69d2cd]"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
