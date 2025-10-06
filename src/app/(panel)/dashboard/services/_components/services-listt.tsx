"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash } from "lucide-react";
import { DialogService } from "./dialog-service";
import { Service } from "@/generated/prisma";
import { formatCurrency } from "@/utils/formatCurrence";
import { deleteService } from "../_actions/delete-service";
import { toast } from "sonner";

interface ServicesListProps {
  services: Service[];
}

export function ServicesListt({ services }: ServicesListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  async function handleDelete(serviceId: string) {
    const result = await deleteService({ serviceId });
    if (result.error) {
      toast.error(result.error);
      return;
    } else {
      toast.success("Serviço excluído com sucesso");
    }
  }

  function handleEdit(service: Service) {
    setEditingService(service);
    setIsDialogOpen(true);
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) setEditingService(null);
      }}
    >
      <section className="mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl md:text-2xl font-semibold text-gray-800">
              Serviços
            </CardTitle>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className=" bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent
              className="bg-white"
              onInteractOutside={(e) => {
                e.preventDefault();
                setIsDialogOpen(false);
                setEditingService(null);
              }}
            >
              <DialogService
                closeModal={() => {
                  setIsDialogOpen(false);
                  setEditingService(null);
                }}
                editingService={editingService ? editingService.id : null}
                initialValues={
                  editingService
                    ? {
                        name: editingService.name,
                        price: (editingService.price / 100)
                          .toFixed(2)
                          .replace(".", ","),
                        hours: Math.floor(
                          editingService.duration / 60
                        ).toString(),
                        minutes: (editingService.duration % 60).toString(),
                      }
                    : undefined
                }
              />
            </DialogContent>
          </CardHeader>
          <CardContent>
            {services.length === 0 ? (
              <p className="text-gray-500">Nenhum serviço cadastrado.</p>
            ) : (
              <ul className="space-y-4">
                {services.map((service) => (
                  <li
                    key={service.id}
                    className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {service.name}
                      </h3>
                      <p className="text-gray-600">
                        Preço: {formatCurrency(service.price / 100)}
                      </p>
                      <p className="text-gray-600">
                        Duração: {service.duration} minutos
                      </p>
                    </div>
                    <div className="flex gap-2 mt-4 md:mt-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleEdit(service)}
                      >
                        <Pencil className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="border-gray-300 text-red-600 hover:bg-red-50 cursor-pointer"
                        onClick={() => handleDelete(service.id)}
                      >
                        <Trash className="w-4 h-4 mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">
              Total de serviços: {services.length}
            </p>
          </CardFooter>
        </Card>
      </section>
    </Dialog>
  );
}
