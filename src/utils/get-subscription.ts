"use server";

import { prisma } from "@/lib/prisma";

export async function getSubscription({ userId }: { userId: string }) {
 if (!userId) {
   return null;
 }

 try {
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: userId,
      }
    });
    console.log("Assinatura encontrada:", subscription);
    return subscription;
 } catch (error) {
    console.error("Erro ao buscar assinatura:", error);
    return null;
    
 }
}