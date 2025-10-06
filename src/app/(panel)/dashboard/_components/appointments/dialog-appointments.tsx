import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppointmentWithService } from "./appointments-list";
import { format } from "date-fns";
import { formatCurrency } from "@/utils/formatCurrence";

interface DialogAppointmentsProps {
  appointment: AppointmentWithService | null;
}

export function DialogAppointments({ appointment }: DialogAppointmentsProps) {
  return (
    <DialogContent className="sm:max-w-[425px] bg-white ">
      <DialogHeader>
        <DialogTitle>Detalhes da Consulta</DialogTitle>
        <DialogDescription>
          Aqui estão os detalhes completos da consulta.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-2">
        {appointment && (
          <article>
            <p>
              <strong>Data do Agendamento:</strong>{" "}
              {new Intl.DateTimeFormat("pt-BR", {
               timeZone: "UTC",
               year: "numeric",
               month: "2-digit",
               day: "2-digit",
              }).format(new Date(appointment.appointmentDate))}
            </p>
            <p>
              <strong>Horário do Agendamento:</strong> {appointment.time}
            </p>
            <p className="mt-2">
              <strong>Nome:</strong> {appointment.name}
            </p>
            <p>
              <strong>Email:</strong> {appointment.email || "Não fornecido"}
            </p>
            <p>
              <strong>Telefone:</strong> {appointment.phone}
            </p>

            <section className="bg-gray-100 p-4 rounded-md mt-4">
              <p>
                <strong>Serviço:</strong> {appointment.service.name}
              </p>
              <p>
                <strong>Valor:</strong>{" "}
                {appointment.service.price
                  ? formatCurrency(appointment.service.price / 100)
                  : "Não fornecido"}
              </p>
            </section>
          </article>
        )}
      </div>
    </DialogContent>
  );
}
