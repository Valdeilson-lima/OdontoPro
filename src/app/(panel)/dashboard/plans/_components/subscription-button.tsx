"use client";

import { Button } from "@/components/ui/button";
import { Plan } from "@/generated/prisma";
import { createSubscription } from "../_actions/create-subscription";
import { toast } from "sonner";
import { getStripeJs } from "@/utils/stripe-js";

interface SubscriptionButtonProps {
  type: Plan;
}

export function SubscriptionButton({ type }: SubscriptionButtonProps) {
  async function handlecreateBilling() {
    const { sessionId, error, url } = await createSubscription({ type });

    if (error) {
      toast.error(error);
      return;
    }

    const stripeJs = await getStripeJs();

    if (stripeJs && url) {
        window.location.href = url;
       
    }
  }

  return (
    <Button
      className={`w-full bg-emerald-500 hover:bg-emerald-600 border-0 box-shadow-xl text-white text-lg font-semibold cursor-pointer ${
        type === "PROFESSIONAL" && "bg-emerald-700 hover:bg-emerald-800"
      }`}
      onClick={handlecreateBilling}
    >
      Assinar Plano
    </Button>
  );
}
