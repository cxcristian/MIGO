import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className="flex flex-col md:flex-row items-center justify-between bg-white p-6 md:p-12 mt-12 m-12">
        {/* Textos */}
        <div className= "flex flex-col justify-center text-center md:text-left md:w-1/2 space-y-4">
          <h1 className="text-center text-4xl md:text-5xl font-bold text-[#294380]">
            Bienvenido a MIGO
          </h1><hr />
          <p className="text-center text-lg md:text-xl text-[#69d2cd]">
            La Mejor App Web para apoyar tus estudios
          </p>
        </div>

        {/* Imagen */}
        <figure className="mt-6 md:mt-0 md:w-1/2 flex justify-center">
          <Image
            src="/Migo.jpeg" // coloca tu imagen en la carpeta /public
            alt="Ilustración de MIGO"
            width={400}
            height={400}
            className="rounded-lg"
            priority // se carga primero porque es la imagen principal
          />
        </figure>
      </section>
      <br className="text-[#294380]" />

    </main>
  );
}