"use server";
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';


const formSchema = z.object({
    description: z.string().min(1, { message: "Descrição é obrigatória" }),
})

type FormSchema = z.infer<typeof formSchema>;

export async function createReminder(formData: FormSchema) {
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
        await prisma.reminder.create({
            data: {
                description: formData.description,
                userId: session?.user?.id,
            },
        });

        revalidatePath('/dashboard');

        return { success: true, message: "Lembrete criado com sucesso" };
    } catch (error) {
        console.error("Error creating reminder:", error);
        return { error: "Falha ao criar lembrete" };
    }
}