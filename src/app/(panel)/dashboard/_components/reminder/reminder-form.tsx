"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


export const reminderSchema = z.object({
    description: z.string().min(3, "A descrição deve ter no mínimo 3 caracteres").max(255, "A descrição deve ter no máximo 255 caracteres"),
});

export type ReminderFormData = z.infer<typeof reminderSchema>;


export function useReminderForm() {
    const form = useForm<ReminderFormData>({
        resolver: zodResolver(reminderSchema),
        defaultValues: {
            description: "",
        },
    });

    return form;
}

