export default function LearningPage() {
  return (
    <main className="flex flex-col md:flex-row gap-4 p-4">
      {/* Columna izquierda: prompt opcional */}
      <aside className="md:w-1/5 bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-[#294380]">
          Prompt opcional
        </h2>
        <textarea
          rows={5}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-[#69d2cd] focus:outline-none"
          name="aditional"
          id="aditional"
        ></textarea>
      </aside>

      {/* Columna central: notas */}

      <section className="md:w-3/5 bg-white p-4 rounded-lg shadow space-y-4">
        <>
          <h2 className="text-lg font-semibold text-[#294380] text-center bg-[#eeeeeeff]">
            Notas
          </h2>
        </>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Materia
          </label>
          <input
            type="text"
            placeholder="Ej. Matemáticas"
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-[#69d2cd] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Escribe tu nota
          </label>
          <textarea
            rows={5}
            placeholder="Escribe aquí..."
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-[#69d2cd] focus:outline-none"
          />
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none">
              Guardar
            </button>
          </div>
        </div>

        {/* Aquí irían las notas guardadas */}
        <hr />
        <div className="space-y-2">
          <div className="r p-3 border rounded   items-center align-center">
            <h2 className=" text-lg font-semibold text-[#294380] text-center ">
              Notas{" "}
            </h2>
          </div>
        </div>
      </section>

      {/* Columna derecha: guías PDF */}
      <aside className="md:w-1/5 bg-gray-50 p-4 rounded-lg shadow flex flex-col">
        <h2 className="text-lg font-semibold text-[#294380] text-center">
          Guías PDF
        </h2>

        {/* aquí se listan PDFs */}
        <ul className="mt-2 space-y-2">
          <li className="p-2 bg-white rounded shadow">📄 Guía 1</li>
          <li className="p-2 bg-white rounded shadow">📄 Guía 2</li>
        </ul>
        <div className="mt-auto flex justify-end">
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none">
            Generar Guía
          </button>
        </div>
      </aside>
    </main>
  );
}
