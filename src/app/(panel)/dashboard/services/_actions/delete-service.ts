"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
   serviceId: z.string().min(1, { message: "ID do serviço obrigatório" }),
   
});

type FormSchemaType = z.infer<typeof formSchema>;

export async function deleteService(formData: FormSchemaType) {
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
       await prisma.service.update({
              where: {
                id: formData.serviceId,
                userId: sesion.user.id,
              },
              data: {
                status: false
              },
         });
         revalidatePath("/dashboard/services");

            return {
                data: "Serviço deletado com sucesso",
            }
       } catch (error) {
           console.log(error);
           return {
               error: "Erro ao deletar serviço",
           };
       }
   }