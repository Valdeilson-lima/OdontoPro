"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/utils/stripe";



export async function createPortalCustomer() {
    const session = await auth();
    if (!session?.user?.email) {
        throw new Error("Unauthorized");
    }

    if (!session?.user?.id) {
        return {
            sessionId: "",
            error: "Usuario não autenticado"
        }

    }

    const user = await prisma.user.findFirst({
        where: { id: session.user.id },
    });

    if (!user) {
        return {
            sessionId: "",
            error: "Usuario não autenticado"
        }

    }

    const sessionId = user.stripe_customer_id;

    if (!sessionId) {
        return {
            sessionId: "",
            error: "Cliente não encontrado"
        }
    }

    try {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: sessionId,
            return_url: `${process.env.STRIPE_SUCCESS_URL}`,
        });

        return {
            sessionId: portalSession.url,
            error: null
        }

    } catch (error) {
        console.error("Error creating portal session:", error);
        return {
            sessionId: "",
            error: "Erro ao criar sessão do portal"
        }
    }
}