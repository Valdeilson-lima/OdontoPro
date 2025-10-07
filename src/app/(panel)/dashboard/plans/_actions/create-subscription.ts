"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { stripe } from "@/utils/stripe";
import { Plan } from "@/generated/prisma";
import { url } from "inspector";

interface CreateSubscriptionProps {
  type: Plan;
}

export async function createSubscription({ type }: CreateSubscriptionProps) {
  const session = await auth();
  const userID = session?.user?.id;

  if (!userID) {
    return {
      sessionId: "",
      error: "Falha ao criar a assinatura.",
    };
  }

  const findUser = await prisma.user.findFirst({
    where: { id: userID },
  });

  if (!findUser) {
    return {
      sessionId: "",
      error: "Usuário não encontrado.",
    };
  }

  let customerId = findUser.stripe_customer_id;

  if (!customerId) {
    // Cria um cliente no Stripe, caso não exista
    const stripeCustomer = await stripe.customers.create({
      email: findUser.email || undefined,
    });
    await prisma.user.update({
      where: { id: userID },
      data: { stripe_customer_id: stripeCustomer.id },
    });
    customerId = stripeCustomer.id;
  }

  // Cria uma sessão de checkout para a assinatura

  try {
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        {
          price:
            type === "BASIC"
              ? process.env.STRIPE_PLAN_BASIC
              : process.env.STRIPE_PLAN_PRO,
          quantity: 1,
        },
      ],
      metadata:{
        type: type
      },
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/plans`,
    });
    return {
        sessionId: stripeCheckoutSession.id,
        url: stripeCheckoutSession.url
    }
  } catch (error) {
    console.error("Erro ao criar a sessão de checkout:", error);
    console.log(error);
    return {
      sessionId: "",
      error: "Falha ao criar pagamento.",
    };
  }
}
