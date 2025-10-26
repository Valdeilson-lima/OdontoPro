"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
    name: z.string().min(2, { message: "Nome obrigatório" }).max(100),
    price: z.number().min(1, { message: "Preço muito curto" }).max(1000000),
    duration: z.number().min(1, { message: "Duração muito curta" }).max(10000),
   
});

type FormSchemaType = z.infer<typeof formSchema>;


export async function createNewService(formData: FormSchemaType) {
    const sesion= await auth();

    if (!sesion?.user?.id) {
        return {
            error: "Usuário não autenticado",
        }
    }

    const schema = formSchema.safeParse(formData);

    if (!schema.success) {
        return {
            error: schema.error.issues[0].message,
            
        }
    }

    try {
        const service = await prisma.service.create({
            data: {
                name: formData.name,
                price: formData.price,
                duration: formData.duration,
                userId: sesion.user.id,
            },
        });
        revalidatePath("/dashboard/services");

        return {
            data: service,
        };
    } catch {
        return {
            error: "Erro ao criar serviço",
        };

    }
}
