import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import fotoImg from "../../../../public/foto1.png";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { User } from "@/generated/prisma/wasm";

interface ClinicPros {
  clinics: User[];
}

export function Clinics({clinics}: ClinicPros) {
  

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Clínicas Disponíveis
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clinics.map((clinic, index) => (
            <Card
              key={index}
              className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden shadow-ld duration-75"
            >
              <CardContent className="p-0">
                {/* Imagem no topo */}
                <div className="relative h-48">
                  <Image
                    src={clinic.image || fotoImg}
                    alt={`Foto da ${clinic.name}`}
                    fill
                    priority
                    className="object-cover w-full h-full rounded-t-md"
                  />
                </div>

                {/* Conteúdo do card */}
                <div className="p-4 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{clinic.name}</h3>
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                    </div>
                    <p className="text-sm text-gray-500">{clinic.address ?? "Endereço não disponível"}</p>
                  </div>

                  <Link
                    href={`/clinic/${clinic.id}`}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 duration-400 transform transition-colors text-white text-center py-2 px-4 rounded-md font-semibold text-sm md:text-base inline-flex items-center justify-center"
                    target="_blank"
                  >
                    Agendar Horários
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
