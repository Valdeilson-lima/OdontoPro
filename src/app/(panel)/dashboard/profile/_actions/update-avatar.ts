"use server";

import { prisma }from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";


export async function updateProfileAvatar({avatarUrl}: {avatarUrl: string}) {
    const session = await auth();

    if (!session?.user?.id) {
       return {
        error: "Falha ao atualizar o avatar: Usuário não autorizado.",
       }
    }

    if (!avatarUrl || avatarUrl.trim() === "") {
       return {
        error: "Falha ao atualizar o avatar: URL inválida.",
       }
    }

    try {
         await prisma.user.update({
             where: { 
                id: session?.user.id
             },
             data: { 
                image: avatarUrl
             }
         });

         revalidatePath("/dashboard/profile");

         return {
            data: "Avatar atualizado com sucesso.",
         }


    } catch (error) {
         console.error("Erro ao atualizar o avatar no banco de dados:", error);
         return {
          error: "Falha ao atualizar o avatar: Erro no servidor.",
         }
        
    }
}