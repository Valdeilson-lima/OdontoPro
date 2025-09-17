import { Button } from "@/components/ui/button";
import Image from "next/image";
import doctorImage from "../../../../public/doctor-hero.png";

export function Hero() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 pt-20 sm:px-6 lg:px-8">
        <main className="flex items-center justify-center">
          <article className="flex-[2]space-y-8 max-w-3xl flex flex-col justify-center">
            <h1 className="text-4xl font-bold lg:text-5xl max-w-xl tracking-tight">
              Encontre os melhores profissionais odontológicos em um só lugar.
            </h1>
            <p className="text-base md:text-lg text-gray-600 mt-2">
              Nos somos a plataforma que conecta pacientes a dentistas de forma
              rápida, fácil e simplificada. Agende sua consulta agora mesmo!
            </p>
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-white w-fit px-6 py-2 rounded-md mt-3 font-semibold cursor-pointer">
              Encontre um Profissional
            </Button>
          </article>

          <div className="hidden lg:block lg:ml-10">
            <Image
              src={doctorImage}
              alt="Descrição da imagem"
              width={340}
              height={400}
              className="object-contain"
              quality={100}
              priority
            />
          </div>
        </main>
      </div>
    </section>
  );
}
("");
