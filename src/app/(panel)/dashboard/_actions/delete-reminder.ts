"use server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  reminderId: z.string().min(1, { message: "ID do lembrete é obrigatório" }),
});

export type FormSchema = z.infer<typeof formSchema>;
export async function deleteReminder(data: unknown) {
  // Validate the input
  const validationResult = formSchema.safeParse(data);
  if (!validationResult.success) {
    return {
      error: validationResult.error.issues[0].message,
    };
  }

  const { reminderId } = validationResult.data;

  // Delete the reminder from the database
  try {
    await prisma.reminder.delete({
      where: {
        id: reminderId,
      },
    });

    revalidatePath("/dashboard");

    return { success: true, message: "Lembrete excluído com sucesso" };
  } catch (error) {
    console.error("Error deleting reminder:", error);
    throw new Error("Failed to delete reminder");
  }
}
