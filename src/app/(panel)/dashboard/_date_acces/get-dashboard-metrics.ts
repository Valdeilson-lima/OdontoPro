"use server";

import { prisma } from "@/lib/prisma";

type DashboardMetrics = {
  appointmentsCount: number;
  activeRemindersCount: number;
  todayRevenue: number; // BRL decimal (e.g., 1234.56)
};

function getTodayBounds(date = new Date()) {
  // Use limites em UTC para alinhar com rotas existentes que usam Date.UTC
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const start = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
  const end = new Date(Date.UTC(year, month, day, 23, 59, 59, 999));
  return { start, end };
}

export async function getDashboardMetrics({
  userId,
}: {
  userId: string;
}): Promise<DashboardMetrics> {
  if (!userId) {
    throw new Error("User ID is required to fetch dashboard metrics.");
  }

  const { start, end } = getTodayBounds();

  // Parallelize queries para desempenho
  const [appointments, reminders] = await Promise.all([
    prisma.appointment.findMany({
      where: {
        userId,
        appointmentDate: {
          gte: start,
          lte: end,
        },
      },
      include: { service: { select: { price: true } } },
    }),
    prisma.reminder.findMany({
      where: { userId, createdAt: { gte: start, lte: end } },
      select: { id: true },
    }),
  ]);

  const appointmentsCount = appointments.length;

  // price está em inteiro (centavos). Convertemos para BRL decimal.
  const totalCents = appointments.reduce((acc, apt) => {
    const priceCents = apt.service?.price ?? 0;
    return acc + priceCents;
  }, 0);
  const todayRevenue = totalCents / 100;

  const activeRemindersCount = reminders.length;

  return { appointmentsCount, activeRemindersCount, todayRevenue };
}
