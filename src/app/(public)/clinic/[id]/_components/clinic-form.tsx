"use client";
import { email, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const apointmentFormSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("Email é obrigatório").optional().or(z.literal("")),
  phone: z
    .string()
    .min(1, "O telefone é obrigatório")
    .optional()
    .or(z.literal("")),
  date: z.date(),
  serviceId: z.string().min(1, "O serviço é obrigatório"),
});

export type AppointmentFormData = z.infer<typeof apointmentFormSchema>;

export function useAppointmentForm() {
  return useForm<AppointmentFormData>({
    resolver: zodResolver(apointmentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceId: "",
      date: new Date(),
    },
  });
}
