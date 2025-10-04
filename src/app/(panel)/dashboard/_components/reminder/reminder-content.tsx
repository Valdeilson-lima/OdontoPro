"use client";

import { Button } from "@/components/ui/button";
import { useReminderForm } from "./reminder-form";
import { Form, FormItem, FormLabel, FormField, FormMessage, FormControl} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ReminderFormData } from "./reminder-form";
import { createReminder } from "@/app/(panel)/dashboard/_actions/create.reminder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ReminderContentProps {
  closeDialog: () => void;
}

export function ReminderContent({ closeDialog }: ReminderContentProps) {
  const form = useReminderForm();
  const router = useRouter();

  async function onSubmit(formData: ReminderFormData) {
    const result = await createReminder(formData);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.message);
    }
    form.reset();
    router.refresh();
    closeDialog();
  }
  return (
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Descrição</FormLabel>
                <FormControl>
                  <Textarea {...field} className="focus:ring-0 focus-visible:ring-0 outline-none shadow-none appearance-none border-emerald-500 max-h-60 resize-none" />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!form.watch().description} className="w-full bg-emerald-500 hover:bg-emerald-600 text-black mt-4 cursor-pointer">
            Adicionar Lembrete
          </Button>
        </form>

      </Form>
      
    </div>
  );
}
