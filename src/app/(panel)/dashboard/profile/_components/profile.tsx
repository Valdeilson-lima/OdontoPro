"use client";
import { useState } from "react";
import { ProfileFormData, userProfileForm } from "./profile-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import imgtest from "../../../../../../public/foto1.png";
import { ArrowBigRight } from "lucide-react";
import { updateProfile } from "../_actions/update-profile";
import { toast } from "sonner";
import { formatPhone, unformatPhone } from "@/utils/formatPhone";

type UserWithSubscription = {
  id: string;
  name: string | null;
  address: string | null;
  phone: string | null;
  status: boolean;
  email: string;
  timeZone: string | null;
  image: string | null;
  emailVerified: Date | null;
  stripe_customer_id: string | null;
  times: string[];
  createdAt: Date;
  updatedAt: Date;
  subscription: {
    status: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
    plan: string; // ou $Enums.Plan se quiser tipar mais forte
    priceId: string;
  } | null;
};

interface ProfileContentProps {
  user: UserWithSubscription;
}

export function ProfileContent({ user }: ProfileContentProps) {
  const [selectedTime, setSelectedTime] = useState<string[]>(user.times ?? []);
  const [isOpen, setIsOpen] = useState(false);
  const form = userProfileForm({
    name: user.name,
    address: user.address,
    phone: user.phone,
    status: user.status,
    timezone: user.timeZone,
  });

  function generateTimeSlots(): string[] {
    const hours: string[] = [];
    for (let i = 8; i <= 24; i++) {
      for (let j = 0; j < 60; j += 30) {
        const hour = i.toString().padStart(2, "0");
        const minute = (j * 30).toString().padStart(2, "0");
        hours.push(`${hour}:${minute}`);
      }
    }
    return hours;
  }

  const hours = generateTimeSlots();

  function toggleTimeSelection(time: string) {
    setSelectedTime((prev) =>
      prev.includes(time)
        ? prev.filter((t) => t !== time)
        : [...prev, time].sort()
    );
  }

  const timeZones = Intl.supportedValuesOf("timeZone").filter(
    (zone) =>
      zone.startsWith("America/Sao_Paulo") ||
      zone.startsWith("America/Cuiaba") ||
      zone.startsWith("America/Manaus") ||
      zone.startsWith("America/Bahia") ||
      zone.startsWith("America/Fortaleza") ||
      zone.startsWith("America/Recife") ||
      zone.startsWith("America/Santarem") ||
      zone.startsWith("America/Belem") ||
      zone.startsWith("America/Campo_Grande") ||
      zone.startsWith("America/Porto_Velho") ||
      zone.startsWith("America/Rio_Branco") ||
      zone.startsWith("America/Natal") ||
      zone.startsWith("America/Araguaina") ||
      zone.startsWith("America/Maceio") ||
      zone.startsWith("America/Boa_Vista") ||
      zone.startsWith("America/Eirunepe") ||
      zone.startsWith("America/Sao_Paulo")
  );

  async function onSubmit(values: ProfileFormData) {

    const unformattedPhone = unformatPhone(values.phone ||"");
    
    const response = await updateProfile({
      name: values.name,
      address: values.address,
      phone: unformattedPhone,
      status: values.status === "active" ? true : false,
      timezone: values.timezone,
      times: selectedTime || [],
    });

    if (response.error) {
      toast.error(response.error, { closeButton: true });
      return;
    }

    if (response.success) {
      toast.success(response.success, { closeButton: true });
      return;
    }
  }

  return (
    <div className="mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Meu Perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="relative h-40 w-40 rounded-full overflow-hidden border border-gray-300">
                  <Image
                    src={user.image ? user.image : imgtest}
                    alt="User Profile"
                    fill
                    className="object-cover "
                  />
                </div>
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name" className="font-semibold">
                        Nome Completo
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o nome da sua empresa"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="address" className="font-semibold">
                        Endereço
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o endereço da sua empresa"
                          {...field}
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
                      <FormLabel htmlFor="phone" className="font-semibold">
                        Telefone
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="(99) 99999-9999"
                          maxLength={16}
                          onChange={(e) => {
                            const formattedPhone = formatPhone(e.target.value);
                            field.onChange(formattedPhone);
                          }}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="status" className="font-semibold">
                        Status
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(val) => field.onChange(val)}
                        >
                          <SelectTrigger className="w-full ">
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem
                              value="active"
                              className="cursor-pointer hover:bg-gray-100"
                            >
                              Ativo (Clinica Aberta)
                            </SelectItem>
                            <SelectItem
                              value="inactive"
                              className="cursor-pointer hover:bg-gray-100"
                            >
                              Inativo (Clinica Fechada)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <div className="space-y-2">
                  <Label className="font-semibold">
                    Configurar Horários de Funcionamento
                  </Label>

                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between cursor-pointer"
                      >
                        Clique aqui para selecionar os horários
                        <ArrowBigRight className="ml-2 w-5 h-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle>Horários de Funcionamento</DialogTitle>
                        <DialogDescription>
                          Aqui você pode configurar os horários de funcionamento
                          da sua clínica.
                        </DialogDescription>
                      </DialogHeader>
                      <section className="py-4">
                        <p className="text-sm text-muted-foreground pt-0 mb-2">
                          Clique nos horários abaixo para selecionar:
                        </p>

                        <div className="grid grid-cols-5 gap-2 overflow-y-auto">
                          {hours.map((time) => (
                            <Button
                              key={time}
                              variant="outline"
                              className="border-2 cursor-pointer"
                              onClick={() => toggleTimeSelection(time)}
                              style={{
                                backgroundColor: selectedTime.includes(time)
                                  ? "#34D399"
                                  : "",
                                color: selectedTime.includes(time)
                                  ? "black"
                                  : "",
                              }}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </section>

                      <Button
                        className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 cursor-pointer"
                        onClick={() => setIsOpen(false)}
                      >
                        Fechar modal
                      </Button>
                    </DialogContent>
                  </Dialog>
                </div>
                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="timezone" className="font-semibold">
                        Selecione o Fuso Horário
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full ">
                            <SelectValue placeholder="Selecione o fuso horário" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {timeZones.map((zone) => (
                              <SelectItem
                                key={zone}
                                value={zone}
                                className="cursor-pointer hover:bg-gray-100"
                              >
                                {zone}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 cursor-pointer font-bold"
                >
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
