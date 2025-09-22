"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter no mínimo 2 caracteres" }),
  address: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  status: z.boolean(),
  timezone: z.string(),
  times: z.array(z.string()),
});

export type formSchema = z.infer<typeof formSchema>;

export async function updateProfile(formData: formSchema) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Usuário não encontrado" };
  }

  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return { error: "Preencha todos os campos corretamente" };
  }

  try {
    await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        name: schema.data.name,
        address: schema.data.address,
        phone: schema.data.phone,
        status: schema.data.status,
        timeZone: schema.data.timezone,
        times: schema.data.times,
      },
    });

    revalidatePath("/dashboard/profile");

    return { success: "Perfil atualizado com sucesso!" };
  } catch (error) {
    console.log(error);
    return { error: "Erro ao atualizar perfil" };
  }
}
