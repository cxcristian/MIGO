interface OptionalPromptProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

export default function OptionalPrompt({ prompt, setPrompt }: OptionalPromptProps) {
  return (
    <aside className="md:w-1/5 bg-gray-100 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-[#294380]">
        Prompt opcional
      </h2>
      <textarea
        rows={5}
        className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-[#69d2cd] focus:outline-none"
        placeholder="Ej. Explícame la segunda guerra mundial en 5 puntos clave..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>
    </aside>
  );
}
