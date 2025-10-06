import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/*
  Rota para buscar todas as consultas de uma clínica (usuário logado) em uma data específica.
  Exemplo de uso: GET /api/clinic/appointments?date=2025-10-28
*/

export const GET = auth(async function GET(request) {
  if (!request.auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const dateString = searchParams.get("date") as string;
  // Em nosso modelo, usamos o id do usuário (User.id) como identificador da "clínica"
  let userId = request.auth?.user?.id as string | undefined | null;

  if (!dateString) {
    return NextResponse.json(
      { message: "Data não fornecida" },
      { status: 400 }
    );
  }

  if (!userId) {
    // Fallback: alguns setups de sessão não incluem user.id por padrão.
    // Tentamos obter pelo e-mail da sessão.
    const email = request.auth.user?.email as string | undefined;
    if (email) {
      const dbUser = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
      });
      userId = dbUser?.id ?? null;
    }

    if (!userId) {
      return NextResponse.json(
        { message: "ID da clínica não fornecido" },
        { status: 400 }
      );
    }
  }

  try {
    const [year, month, day] = dateString.split("-").map(Number);

    // Importante: os agendamentos são salvos com appointmentDate na meia-noite LOCAL (ver create-appointment.ts)
    // Portanto, filtramos usando limites do dia em horário LOCAL para evitar problemas de fuso horário.
    const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

    

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
      orderBy: { appointmentDate: "asc" },
    });

    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar consultas:", error);
    return NextResponse.json(
      { message: "Erro ao buscar consultas" },
      { status: 500 }
    );
  }
});
