import { prisma } from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const userId = searchParams.get("userId");
  const dateParam = searchParams.get("date");

  if (!userId || userId === "null" || !dateParam || dateParam === "null") {
    return NextResponse.json(
      { error: "Nenhum agendamento encontrado" },
      { status: 400 }
    );
  }

  try {
    // Converter a data recebida em um objeto Date
    const [year, month, day] = dateParam.split("-").map(Number);
    const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59));

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: userId,
        appointmentDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        service: true,
      },
    });

    const blockedSlots = new Set<string>();

    for (const apt of appointments) {
      const requiredSlots = Math.ceil(apt.service.duration / 30);
      const startIndex = user.times.indexOf(apt.time);

      if (startIndex !== -1) {
        for (let i = 0; i < requiredSlots; i++) {
          const blockedSlot = user.times[startIndex + i];
          if (blockedSlot) {
            blockedSlots.add(blockedSlot);
          }
        }
      }
    }

    const blockedTimes = Array.from(blockedSlots);

    return NextResponse.json(blockedTimes);


  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar agendamentos" },
      { status: 500 }
    );
  }
}

