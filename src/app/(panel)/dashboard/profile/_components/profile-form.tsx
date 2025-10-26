"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UseProfileFormProps {
  name: string | null;
  address: string | null;
  phone: string | null;
  status: boolean 
  timezone: string | null;
}

const profileSchema = z.object({
  name: z.string().min(2, {message: "O nome deve ter no mínimo 2 caracteres"}),
  address: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  status: z.enum(["active", "inactive"]),
  timezone: z.string().min(1, {message: "O fuso horário é obrigatório"}),
})

export type ProfileFormData = z.infer<typeof profileSchema>;

export function useUserProfileForm({name, address, phone, status, timezone}: UseProfileFormProps) {
  return useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: name || "",
      address: address || "",
      phone: phone || "",
      status: status ? "active" : "inactive",
      timezone: timezone || ""
    }
  })
}