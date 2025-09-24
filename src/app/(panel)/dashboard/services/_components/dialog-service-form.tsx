import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome do serviço é obrigatório" }).max(100, { message: "nome do serviço deve ter no máximo 100 caracteres" }),
  price: z.string(),
  hours: z.string(),
  minutes: z.string()
});


export interface DialogServiceFormProps {
    initialValues?: {
        name: string;
        price: string;
        hours: string;
        minutes: string;
    };
}

export type DialogServiceFormData = z.infer<typeof formSchema>;

export function useDialogServiceForm({ initialValues }: DialogServiceFormProps) {
    return useForm<DialogServiceFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues || {
            name: "",
            price: "",
            hours: "",
            minutes: "",
        },
    });
}