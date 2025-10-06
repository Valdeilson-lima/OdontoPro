"use server";
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';


const formSchema = z.object({
    appointmentId: z.string().min(1, { message: "ID da consulta é obrigatória" }),
})

type FormSchema = z.infer<typeof formSchema>;


export async function cancelAppointment(formData: FormSchema) {
    const session = await auth();
    if (!session?.user?.id) {
        return { error: "Usuário não autenticado" };
    }
    // Validate the input
    const validationResult = formSchema.safeParse(formData);

    if (!validationResult.success) {
        return {
            error: validationResult.error.issues[0].message,
        };
    }

   
    try {
        await prisma.appointment.deleteMany({
            where: {
                id: formData.appointmentId,
                userId: session?.user?.id,
            },
        });

        revalidatePath('/dashboard');

        return { success: true, message: "Consulta cancelada com sucesso" };
    } catch (error) {
        console.error("Error canceling appointment:", error);
        return { error: "Falha ao cancelar consulta" };
    }
}