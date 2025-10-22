"use client";
import { Subscription } from "@/generated/prisma";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { subscriptionPlans } from "@/utils/plans";
import { CheckCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPortalCustomer } from "../_actions/create-portal-customer";

interface SubscriptionDetailProps {
  subscription: Subscription;
}

export function SubscriptionDetail({ subscription }: SubscriptionDetailProps) {
  const plan = subscriptionPlans.find((plan) => plan.id === subscription.plan);

  async function handleManageSubscription() {
    const portal = await createPortalCustomer();

    if (portal.error) {
      toast.error(portal.error);
      return;
    }

    if (portal.sessionId) {
      window.location.href = portal.sessionId;
    }
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">Detalhes da Assinatura</CardTitle>
        <CardDescription className="text-lg">
          Sua assinatura está ativa. Obrigado por apoiar nosso trabalho!
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-ls md:text-xl">
            {subscription.plan === "BASIC"
              ? "Plano Básico"
              : "Plano Profissional"}
          </h3>

          <div className="text-sm font-bold uppercase bg-emerald-500 text-white px-4 py-1 rounded-md">
            {subscription.status === "active" ? "Ativa" : "Inativa"}
          </div>
        </div>
        <ul>
            <li className="mt-4 text-sm md:text-base">
              {plan?.features.map((feature) => (
                <div key={feature} className="flex items-center">
                  <CheckCheckIcon className="h-4 w-4 text-emerald-500 mr-2" />
                  <span>{feature}</span>
                </div>
              ))}
            </li>
        </ul>
      </CardContent>

        <CardFooter className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Button variant="outline" className="bg-emerald-500 text-white border-0 hover:bg-emerald-700 cursor-pointer" onClick={handleManageSubscription}>Gerenciar Assinatura</Button>
        </CardFooter>
    </Card>
  );
}
