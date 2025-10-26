import { prisma } from "@/lib/prisma";
import { stripe } from "@/utils/stripe";
import { Plan } from "@/generated/prisma/wasm";


/**
 * Salvar ou atualizar a assinatura no banco de dados
 * @param {string} subscriptionId ID da assinatura no Stripe
 * @param {string} customerId ID do cliente no Stripe
 * @param {boolean} createAction Se true, cria uma nova assinatura; se false, atualiza a existente
 * @param {boolean} deletedAction Se true, marca a assinatura como cancelada
 * @param {Plan} [type] Tipo do plano (opcional)
 * @returns {Promise<Response<void>>}
 * @async
 * @function manageSubscription
 */
export async function ManageSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
  deletedAction = false,
  type?: Plan
) {
  // Buscar o usuário no banco de dados pelo customerId
  const findUser = await prisma.user.findFirst({
    where: {
      stripe_customer_id: customerId,
    },
  });
  if (!findUser) {
    return Response.json(
      { error: "Falha ao realizar assinatura" },
      { status: 400 }
    );
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const subscriptionData = {
    id: subscription.id,
    userId: findUser.id,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
    plan: type ?? "BASIC",
  };

  if (subscriptionId && deletedAction) {
    // Marcar a assinatura como cancelada no banco de dados
    await prisma.subscription.delete({
      where: { id: subscriptionId },
    });
    
    return;
  }

  if (createAction) {
    try {
      await prisma.subscription.create({
        data: subscriptionData,
      });

      return;
    } catch (error) {
      console.error("Erro ao criar assinatura:", error);
      return Response.json(
        { error: "Falha ao criar assinatura" },
        { status: 400 }
      );
    }
    
  } else {
    try {
      const findSubscription = await prisma.subscription.findFirst({
        where: { id: subscriptionId },
      });
      if (!findSubscription) {
        return Response.json(
          { error: "Assinatura não encontrada" },
          { status: 400 }
        );
      }
      await prisma.subscription.update({
        where: { id: findSubscription.id },
        data: {
          status: subscriptionData.status,
          priceId: subscription.items.data[0].price.id,
        },
      });
      return;
    } catch (error) {
      console.error("Erro ao atualizar assinatura:", error);
      return Response.json(
        { error: "Falha ao atualizar assinatura" },
        { status: 400 }
      );
    }
  }
}
