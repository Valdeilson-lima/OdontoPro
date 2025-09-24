"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
    serviceId: z.string().min(1, { message: "ID do serviço obrigatório" }),
    name: z.string().min(2, { message: "Nome obrigatório" }).max(100),
    price: z.number().min(1, { message: "Preço muito curto" }).max(1000000),
    duration: z.number().min(1, { message: "Duração muito curta" }).max(10000),
   
});

type FormSchemaType = z.infer<typeof formSchema>;


export async function updateService(serviceId: string, formData: FormSchemaType) {
    const session= await auth();

    if (!session?.user?.id) {
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
       await prisma.service.update({
            where: {
                id: formData.serviceId,
                userId: session.user.id,
            },
            data: {
                name: formData.name,
                price: formData.price,
                duration: formData.duration < 30 ? 30 : formData.duration,
            },
        });
        revalidatePath("/dashboard/services");

        return {
            data: "Serviço atualizado com sucesso",
        };
    } catch (error) {
        console.log(error);
        return {
            error: "Erro ao atualizar serviço",
        };
        
    }
}
