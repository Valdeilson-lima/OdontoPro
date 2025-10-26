"use client";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import imgTest from "../../../../../../public/foto1.png";
import { MapPin } from "lucide-react";
import { Prisma } from "@/generated/prisma/wasm";
import {
  AppointmentFormData,
  useAppointmentForm,
} from "./clinic-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatPhone } from "@/utils/formatPhone";
import { DateTimePicker } from "./date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ClinicList } from "./clinic-list";
import { createNewAppointment } from "../_actions/create-appointment";
import { toast } from "sonner";

type UserWithServices = Prisma.UserGetPayload<{
  include: {
    subscription: true;
    services: true;
  };
}>;

interface ClinicContentProps {
  user: UserWithServices;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export function ClinicContent({ user }: ClinicContentProps) {
  const form = useAppointmentForm();
  const { watch } = form;

  const selectedDate = watch("date");
  const selectedServiceId = watch("serviceId");

  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [loadingTimeSlots, setLoadingTimeSlots] = useState(false);
  const [blockedTimes, setBlockedTimes] = useState<string[]>([]);

  // Função para buscar horário bloqueados
  const fetchBlockedTimes = useCallback(
    async (date: Date): Promise<string[]> => {
      setLoadingTimeSlots(true);

      try {
        const dateString = date.toISOString().split("T")[0];
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/schedule/get-appointments?userId=${user.id}&date=${dateString}`
        );
        const json = await response.json();
        setLoadingTimeSlots(false);

        return json; // array de horários bloqueados
      } catch (error) {
        console.error("Error fetching blocked times:", error);
        return [];
      } finally {
        setLoadingTimeSlots(false);
      }
    },
    [user.id]
  );

  // Efeito para buscar horários bloqueados quando a data muda
  useEffect(() => {
    if (selectedDate) {
      fetchBlockedTimes(selectedDate).then((blocked) => {
        setBlockedTimes(blocked);

        const times = user.times || [];
        // Garante que blocked é sempre um array
        const blockedArray = Array.isArray(blocked) ? blocked : [];
        const finalSlots = times.map((time) => ({
          time: time,
          available: !blockedArray.includes(time),
        }));

        setAvailableTimeSlots(finalSlots);

        // Verificar o slot atual estiver selecionado e se ainda está disponível
        const stillAvailable = finalSlots.find(
          (slot) => slot.time === selectedTime && slot.available
        );

        if (!stillAvailable) {
          setSelectedTime("");
        }
      });
    }
  }, [selectedDate, user.times, fetchBlockedTimes, selectedTime]);

  async function handleRegisterAppointment(formData: AppointmentFormData) {
    if (!selectedTime) {
      return;
    }
    const response = await createNewAppointment({
      name: formData.name,
      email: formData.email || "",
      phone: formData.phone || "",
      time: selectedTime,
      date:
        formData.date instanceof Date
          ? formData.date.toISOString()
          : formData.date,
      serviceId: formData.serviceId,
      userId: user.id,
    });
    if (response.error) {
      toast.error(response.error, { closeButton: true });
      return;
    }

    toast.success("Agendamento criado com sucesso!", { closeButton: true });
    form.reset();
    setSelectedTime("");
    setAvailableTimeSlots([]);
  }

  return (
    <div className="mini-h-screen flex flex-col">
      <div className="h-32 bg-emerald-500" />

      <section className="container mx-auto px-4 -mt-16">
        <div className="max-w-2xl mx-auto">
          <article className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-md mb-8">
              <Image
                src={user.image || imgTest}
                alt="Foto da Clinica"
                className="object-cover"
                fill
              />
            </div>

            <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
            <div className="mt-2 text-gray-600 flex items-center gap-2">
              <MapPin className="inline-block w-5 h-5 text-emerald-500 mr-1" />
              <span className="text-gray-600">{user.address || "Endereço não disponível"}</span>
            </div>
          </article>
        </div>
      </section>

      {/* Formulario de agendamento */}
      <Form {...form}>
        <form
          className="space-y-6 bg-white p-6 border rounded-md shadow-sm max-w-3xl mx-auto w-full mt-10"
          onSubmit={form.handleSubmit(handleRegisterAppointment)}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Agende sua Consulta
          </h2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800 font-semibold">
                  Nome Completo
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="name"
                    placeholder="Digite seu nome completo"
                    className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800 font-semibold">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="email"
                    placeholder="Digite seu email"
                    className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800 font-semibold">
                  Telefone
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="phone"
                    placeholder="(99) 99999-9999"
                    onChange={(e) => {
                      const formattedPhone = formatPhone(e.target.value);
                      field.onChange(formattedPhone);
                    }}
                    value={field.value}
                    maxLength={15}
                    className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-1">
                <FormLabel className="text-gray-800 font-semibold">
                  Data do Agendamento
                </FormLabel>
                <FormControl>
                  <DateTimePicker
                    minDate={new Date()}
                    className="w-full rounded-md border p-2"
                    initialDate={field.value}
                    onChange={(date) => {
                      if (date) {
                        field.onChange(date);
                        setSelectedTime("");
                        setAvailableTimeSlots([]);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="serviceId"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-gray-800 font-semibold">
                  Serviço
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => { 
                      field.onChange(value);
                      setSelectedTime("");
                    }}
                  >
                    <SelectTrigger className="w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                      <SelectValue
                        placeholder="Selecione um serviço"
                        className="text-gray-600"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-md shadow-sm">
                      {user.services.map((service) => (
                        <SelectItem
                          key={service.id}
                          value={service.id}
                          className="hover:bg-emerald-500 hover:text-white cursor-pointer"
                        >
                          {service.name} - ({Math.floor(service.duration / 60)}h{" "}
                          {service.duration % 60}min)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {selectedServiceId && (
            <div className="space-y-2">
              <Label className="text-gray-800 font-semibold">
                Horarios Disponiveis
              </Label>
              <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg ">
                {loadingTimeSlots ? (
                  <p className="p-4 text-gray-600">Carregando horários...</p>
                ) : availableTimeSlots.length === 0 ? (
                  <p className="p-4 text-gray-600">
                    Nenhum horário disponível para esta data.
                  </p>
                ) : (
                  <ClinicList
                    onSelectTime={(time) => setSelectedTime(time)}
                    clinicTimes={user.times || []}
                    selectedDate={selectedDate!}
                    selectedTime={selectedTime}
                    requireSlots={
                      user.services.find(
                        (service) => service.id === selectedServiceId
                      )
                        ? Math.ceil(
                            user.services.find(
                              (service) => service.id === selectedServiceId
                            )!.duration / 30
                          )
                        : 1
                    }
                    blockedTimes={blockedTimes}
                    availableTimeSlots={availableTimeSlots}
                  />
                )}
              </div>
            </div>
          )}
          {user.status ? (
            <Button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-md cursor-pointer"
              disabled={
                !form.watch("name") ||
                !watch("email") ||
                !watch("phone") ||
                !watch("date")
              }
            >
              Agendar Consulta
            </Button>
          ) : (
            <div className="p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-md">
              <p>
                A clinica está fechada no momento. Entre em contato para mais
                informações.
              </p>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
