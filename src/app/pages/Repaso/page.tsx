export default function LearningPage() {
  return (
    <main className="flex flex-col md:flex-row gap-4 p-4">
      {/* Columna izquierda: prompt opcional */}
      <aside className="md:w-1/5 bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-[#294380]">Prompt opcional</h2>
        {/* aquí tu input / textarea */}
      </aside>

      {/* Columna central: notas */}
      <section className="md:w-3/5 bg-white p-4 rounded-lg shadow space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Materia</label>
          <input
            type="text"
            placeholder="Ej. Matemáticas"
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-[#69d2cd] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Escribe tu nota</label>
          <textarea
            rows={5}
            placeholder="Escribe aquí..."
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-[#69d2cd] focus:outline-none"
          />
        </div>

        {/* Aquí irían las notas guardadas */}
        <div className="space-y-2">
          <div className="p-3 border rounded flex justify-between items-center">
            <p className="text-sm">Nota del estudiante...</p>
            <div className="flex gap-2">
              <button className="text-blue-600 text-sm">Editar</button>
              <button className="text-red-600 text-sm">Eliminar</button>
            </div>
          </div>
        </div>
      </section>

      {/* Columna derecha: guías PDF */}
      <aside className="md:w-1/5 bg-gray-50 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-[#294380]">Guías PDF</h2>
        {/* aquí se listan PDFs */}
        <ul className="mt-2 space-y-2">
          <li className="p-2 bg-white rounded shadow">📄 Guía 1</li>
          <li className="p-2 bg-white rounded shadow">📄 Guía 2</li>
        </ul>
      </aside>
    </main>
  );
}