"use server";

import { prisma } from "@/lib/prisma";

interface getUserdataProps {
  userId: string;
  // Define propriedades se necessário
}

export async function getUserdata({ userId }: getUserdataProps) {
  try {
    if (!userId) {
      return null;
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
        include: {
        subscription: true,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
