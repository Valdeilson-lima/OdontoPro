"use client";
import { useState } from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useDialogServiceForm } from "./dialog-service-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogServiceFormData } from "./dialog-service-form";
import { coonvertRealCentes } from "@/utils/convertCurrency";
import { createNewService } from "../_actions/create-service";
import { updateService } from "../_actions/update-service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DialogServiceProps {
  closeModal: () => void;
  editingService?: string | null;
  initialValues?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  };
}

export function DialogService({
  closeModal,
  editingService,
  initialValues,
}: DialogServiceProps) {
  const form = useDialogServiceForm({ initialValues });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(values: DialogServiceFormData) {
    setIsLoading(true);
    const priceInCentes = coonvertRealCentes(values.price);
    const hours = parseInt(values.hours) || 0;
    const minutes = parseInt(values.minutes) || 0;
    const durationInMinutes = hours * 60 + minutes;

    if (editingService) {
      await handleUpdate({
        serviceId: editingService,
        name: values.name,
        priceInCents: priceInCentes,
        duration: durationInMinutes,
      });
      setIsLoading(false);
      return;
    }

    const formData = {
      name: values.name,
      price: priceInCentes,
      duration: durationInMinutes,
    };
    setIsLoading(false);

    const result = await createNewService(formData);

    if (result.error) {
      toast.error(result.error);

      return;
    } else {
      toast.success("Serviço criado com sucesso!");
      handleClose();
      router.refresh();
    }
  }

  async function handleUpdate({
    serviceId,
    name,
    priceInCents,
    duration,
  }: {
    serviceId: string;
    name: string;
    priceInCents: number;
    duration: number;
  }) {
    setIsLoading(true);
    const formData = {
      serviceId,
      name,
      price: priceInCents,
      duration,
    };

    const result = await updateService(serviceId, formData);

    if (result.error) {
      toast.error(result.error);
      setIsLoading(false);
      return;
    } else {
      toast.success("Serviço atualizado com sucesso!");
      handleClose();
      router.refresh();
    }
    
  }

  function handleClose() {
    form.reset();
    closeModal();
  }

  function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;
    // Remove tudo que não é número
    value = value.replace(/\D/g, "");
    // Converte para centavos
    const floatValue = (parseInt(value, 10) || 0) / 100;
    // Formata para BRL
    const formatted = floatValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    event.target.value = formatted;
    form.setValue("price", formatted);
  }

  return (
    <>
      <DialogHeader>
        {editingService ? (
          <DialogTitle>Editar Serviço</DialogTitle>
        ) : (
          <DialogTitle>Adicionar Serviço</DialogTitle>
        )}
        {editingService ? (
          <DialogDescription>
            Atualize as informações do serviço.
          </DialogDescription>
        ) : (
          <DialogDescription>
            Preencha as informações do novo serviço.
          </DialogDescription>
        )}
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => onSubmit(data))}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel className="text-gray-800 font-semibold">
                  Nome do Serviço
                </FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Nome do Serviço" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="pt-4">
                <FormLabel className="text-gray-800 font-semibold">
                  Valor do Serviço
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Preço Ex: R$100,00"
                    type="text"
                    onChange={changeCurrency}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <p className="text-gray-800 font-semibold">Tempo Estimado:</p>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="hours"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-gray-800 font-semibold">
                    Horas
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Horas" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minutes"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-gray-800 font-semibold">
                    Minutos
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Minutos" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer font-bold"
            disabled={isLoading}
          >
            {isLoading
              ? "Adicionando..."
              : `${editingService ? "Atualizar Serviço" : "Adicionar Serviço"}`}
          </Button>
        </form>
      </Form>
    </>
  );
}
