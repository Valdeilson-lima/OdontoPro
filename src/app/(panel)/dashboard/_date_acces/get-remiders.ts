"use server";

import { prisma } from "@/lib/prisma";

export async function getReminders({ userId }: { userId: string }) {
  if (!userId) {
    throw new Error("User ID is required to fetch reminders.");
  }

  try {
    const reminders = await prisma.reminder.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return reminders;
  } catch (error) {
    console.error("Error fetching reminders: ", error);
    throw new Error("Failed to fetch reminders.");
  }
}
