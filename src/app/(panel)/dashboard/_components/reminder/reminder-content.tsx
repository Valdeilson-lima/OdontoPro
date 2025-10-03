"use client";

import { Button } from "@/components/ui/button";
import { useReminderForm } from "./reminder-form";
import { Form, FormItem, FormLabel, FormField, FormMessage, FormControl} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ReminderFormData } from "./reminder-form";

export function ReminderContent() {
  const form = useReminderForm();

  async function onSubmit(formData: ReminderFormData) {
    console.log(formData.description);
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
