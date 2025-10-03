"use client";

import { Button } from "@/components/ui/button";
import { LinkIcon } from "lucide-react";
import { toast } from "sonner";

export function ButtonCopyLink({ userId }: { userId: string }) {
  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_BASE_URL}/clinic/${userId}`
      );
      toast.success("Link copiado para a área de transferência!");
    } catch (err) {
      console.error("Erro ao copiar o link: ", err);
      toast.error("Falha ao copiar o link.");
    }
  }

  return (
    <Button
      onClick={() => handleCopyLink()}
      className="bg-black text-white cursor-pointer hover:bg-gray-800 flex items-center justify-center"
    >
      <LinkIcon className="h-4 w-4" />
    </Button>
  );
}
