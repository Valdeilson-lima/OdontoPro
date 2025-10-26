import { prisma } from "@/lib/prisma";

export async function getClinics() {
  try {
    const clinics = await prisma.user.findMany({
      where: {
        status: true,
      },
      include: {
        subscription: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return clinics;
  } catch {
    return { error: "Erro ao buscar clínicas" };
  }
}
