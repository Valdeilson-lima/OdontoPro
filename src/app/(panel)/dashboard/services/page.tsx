import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import { ServicesContent } from "./_components/service-content";
import { Suspense } from "react";

export default async function Services () {
    const session = await getSession();
    if (!session) {
        redirect('/'); // Redireciona para a página pública se não estiver autenticado
    }
    return (
        <Suspense fallback={<div className="text-center">Aguarde! Carregando Página...</div>}>
        <ServicesContent userId={session.user?.id} />
        </Suspense>
    )
}