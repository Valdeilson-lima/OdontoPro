"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Prisma } from "@/generated/prisma/wasm";
import { format } from "date-fns";
import { Eye, Trash } from "lucide-react";
import { cancelAppointment } from "../../_actions/calcel-appointment";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogAppointments } from "./dialog-appointments";
import { ButtonPickerAppointmentDate } from "./button-date";

export type AppointmentWithService = Prisma.AppointmentGetPayload<{
  include: { service: true };
}>;

interface AppointmentsListProps {
  times: string[];
}

export function AppointmentsList({ times }: AppointmentsListProps) {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [detailedAppointment, setDetailedAppointment] = useState<AppointmentWithService | null>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-appointments", date],
    queryFn: async () => {
      let activeDate = date;
      if (!activeDate) {
        const today = new Date();
        activeDate = format(today, "yyyy-MM-dd");
      }

      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/clinic/appointments?date=${activeDate}`;

      const response = await fetch(url);
      const jason = (await response.json()) as AppointmentWithService[];

      if (!response?.ok) {
        return [];
      }

      return jason;
    },
    staleTime: 20000,
    refetchInterval: 60000,
  });

  const occupantMap: Record<string, AppointmentWithService> = {};

  if (data && data.length > 0) {
    for (const appointment of data) {
      const requiredSlots = Math.ceil(appointment.service.duration / 30); // padrão 30 min

      const startIndex = times.indexOf(appointment.time);

      if (startIndex !== -1) {
        for (let i = 0; i < requiredSlots; i++) {
          const slotIndex = startIndex + i;

          if (slotIndex < times.length) {
            occupantMap[times[slotIndex]] = appointment;
          }
        }
      }
    }
  }

  async function handleCancelAppointment(appointmentId: string) {
    const response = await cancelAppointment({ appointmentId });
    if (response.error) {
      toast.error(response.error);
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["get-appointments"] });
    refetch();
    toast.success(response.message || "Consulta cancelada com sucesso");
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Card>
        <CardHeader className="flex flex-row justify-between space-v-0 pb-2">
          <div>
            <CardTitle className="text-xl md:text-2xl font-bold">
              Consultas Agendadas
            </CardTitle>
            <CardDescription>
              Veja as consultas agendadas para o dia selecionado.
            </CardDescription>
          </div>

         <ButtonPickerAppointmentDate />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-20rem)] lg:h-[calc(100vh-15rem)]">
            {isLoading ? (
              <p>Carregando Agenda...</p>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-800 border-y border-gray-200 dark:border-gray-800">
                {times.map((time) => {
                  const occupant = occupantMap[time];

                  return occupant ? (
                    <div key={time} className="flex items-center py-2">
                      <div className="w-16 text-sm font-semibold">{time}</div>
                      <div className="flex-1 text-sm">
                        <div className="font-semibold">{occupant.name}</div>
                        <div className="text-sm text-gray-500">
                          {occupant.service.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {occupant.phone}
                        </div>
                      </div>

                      <div className="ml-auto">
                        <div className="flex space-x-1">
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size={"icon"}
                              className="cursor-pointer hover:bg-blue-600"
                              title="Ver Detalhes"
                              onClick={() => {
                                setDetailedAppointment(occupant);
                                setIsDialogOpen(true);
                              }}

                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>

                          <Button
                            variant="ghost"
                            size={"icon"}
                            className="cursor-pointer hover:bg-red-600"
                            onClick={() => handleCancelAppointment(occupant.id)}
                            title="Cancelar Consulta"
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={time} className="flex items-center py-2">
                      <div className="w-16 text-sm font-semibold">{time}</div>
                      <div className="text-sm text-gray-600">Disponível</div>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
      <DialogAppointments appointment={detailedAppointment} />
    </Dialog>
  );
}
