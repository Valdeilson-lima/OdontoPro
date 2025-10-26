import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/utils/stripe";
import { ManageSubscription } from "@/utils/manage-subscription";
import { Plan } from "@/generated/prisma/wasm";
import { revalidatePath } from "next/cache";



export const POST = async (request: Request) => {

    const sig = request.headers.get("stripe-signature") as string;

    if (!sig) {
        return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
        await request.text(),
        sig,
        process.env.STRIPE_SECRET_WEBHOOK_KEY as string
    );

    switch (event.type) {
        case "customer.subscription.deleted":
            const payment = event.data.object as Stripe.Subscription;
            await ManageSubscription(
                payment.id,
                payment.customer.toString(),
                false,
                true
            );
            break;
        case "customer.subscription.updated":
            const updatedSubscription = event.data.object as Stripe.Subscription;
            await ManageSubscription(
                updatedSubscription.id,
                updatedSubscription.customer.toString(),
                false,
                false,
                updatedSubscription.items.data[0].price.id as Plan
            );
            break;
        case "checkout.session.completed":
            const session = event.data.object as Stripe.Checkout.Session;
            const type = session?.metadata?.type ? session.metadata.type : "BASIC";
            if (session.subscription && session.customer) {

                await ManageSubscription(
                    session.subscription.toString(),
                    session.customer.toString(),
                    true,
                    false,
                    type as Plan
                );
            }
            break;
        default:
            // evento não tratado: manter sem log em produção
    }
    revalidatePath(`/dashboard/plans`)
    return NextResponse.json({ received: true });

}
