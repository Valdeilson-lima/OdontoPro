import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import { GridPlans } from "./_components/grid-plans";
import { getSubscription } from "@/utils/get-subscription";

export default async function Plans() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const subscription = await getSubscription({ userId: session?.user?.id! });

  return (
    <div>
      {subscription?.status !== "active" && <GridPlans />}

      {subscription?.status === "active" && (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            Você já possui um plano ativo!
          </h2>
          <p className="text-gray-700">
            Obrigado por ser nosso assinante. Aproveite todos os benefícios do
            seu plano.
          </p>
        </div>
      )}
    </div>
  );
}
