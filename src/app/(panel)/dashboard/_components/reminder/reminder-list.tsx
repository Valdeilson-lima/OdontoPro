"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Reminder } from "@/generated/prisma";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Trash } from "lucide-react";
import { deleteReminder } from "../../_actions/delete-reminder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { ReminderContent } from "./reminder-content";


interface ReminderListProps {
  reminders: Reminder[];
}

export function ReminderList({ reminders }: ReminderListProps) {
  const router = useRouter();

  async function handleDeleteReminder(reminderId: string) {
    const response = await deleteReminder({ reminderId });
    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success(response.message || "Lembrete excluído com sucesso");
    router.refresh();
  }
  return (
    <div className="flex flex-col space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-bold text-xl">Lembretes</CardTitle>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 bg-emerald-500 hover:bg-emerald-600 text-black cursor-pointer"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white">
              <DialogHeader>
                <DialogTitle>Adicionar Lembrete</DialogTitle>
                <DialogDescription>
                 Criar um novo lembrete em bre
                </DialogDescription>  
              </DialogHeader>
              <ReminderContent />
            </DialogContent>

          </Dialog>

        
        </CardHeader>
        <CardContent>
          {reminders.length === 0 ? (
            <CardDescription className="text-center text-sm bg-yellow-100 p-2 rounded-md font-bold">
              Nenhum lembrete encontrado.
            </CardDescription>
          ) : (
            <ul className="list-disc list-inside space-y-2">
              <ScrollArea className="h-[340px] w-full pr-0 overflow-y-auto lg:max-h-[100vh-15rem] flex-1">
                {reminders.map((reminder) => (
                  <li
                    key={reminder.id}
                    className="text-sm bg-yellow-200 p-2 rounded-md"
                  >
                    {reminder.description}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 bg-red-500 hover:bg-red-400 text-white cursor-pointer"
                      onClick={() => {
                        handleDeleteReminder(reminder.id);
                      }}
                    >
                      <Trash className="h-3 w-3" />
                    </Button>
                  </li>
                ))}
              </ScrollArea>
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
