"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),

  email: z
    .string()
    .email({ message: "Email inválido" })
    .or(z.literal("")), // permite vazio

  phone: z
    .string()
    .min(10, { message: "Telefone deve ter no mínimo 10 caracteres" })
    .max(15, { message: "Telefone deve ter no máximo 15 caracteres" }),

  date: z
    .string()
    .min(10, { message: "Data inválida" }),

  serviceId: z
    .string()
    .min(1, { message: "ID de serviço inválido" }),

  time: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Horário inválido (use o formato HH:MM)" }),

  userId: z
    .string().min(1, { message: "ID de usuário inválido" }),
    
});


type FormSchema = z.infer<typeof formSchema>;

export async function createNewAppointment(formData: FormSchema) {
  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return { error: schema.error.issues[0].message };
  }

  try {
    const selectedDate = new Date(formData.date);
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();

    const appointmentDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));

    const newAppointment = await prisma.appointment.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        time: formData.time,
        appointmentDate: appointmentDate,
        serviceId: formData.serviceId,
        userId: formData.userId,
      },
    });
    return { data: newAppointment };
  } catch {
    return { error: "Erro ao criar agendamento" };
  }
}