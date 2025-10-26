"use server";
import { prisma } from "../../../../lib/prisma";

export async function getTimesClinic({ userId }: { userId: string }) {
  if (!userId) {
    return {
      times: [],
      userId: userId,
    };
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        times: true,
        id: true,
      },
    });

    if (!user) {
      return {
        times: [],
        userId: userId,
      };
    }

    return {
      times: user.times,
      userId: user.id,
    };
  } catch {
    return {
      times: [],
      userId: userId,
    };
  }
}
