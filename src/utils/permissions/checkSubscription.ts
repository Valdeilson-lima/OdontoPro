"use server";


import { prisma } from "../../lib/prisma";
import { addDays, differenceInDays, isAfter, sub } from "date-fns";
import { TRIAL_DAYS } from "./trial-dias";



export async function checkSubscription(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId }, include: { subscription: true }

    });



    if (!user) {
        throw new Error("Usuario não encontrado");
    }

    if (user.subscription && user.subscription.status === "active") {
        return {
            subscriptionStatus: "active",
            message: "Assinatura ativa",
            planId: user.subscription.plan
        }
    }

    const trialEndDate = addDays(user.createdAt, TRIAL_DAYS);

    if (isAfter(new Date(), trialEndDate)) {
        return { subscriptionStatus: "EXPIRED", message: "Período de teste expirado", planId: "TRIAL" };
    }

    return {
        subscriptionStatus: "TRIAL",
        message: `Você está em período de teste. Faltam ${differenceInDays(trialEndDate, new Date())} dias para o término.`,
        planId: "TRIAL",
    }
}