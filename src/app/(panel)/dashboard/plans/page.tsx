import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import { GridPlans } from "./_components/grid-plans";
import { getSubscription } from "@/utils/get-subscription";
import { SubscriptionDetail } from "./_components/subscription-detail";


export default async function Plans() {
  const session = await getSession();

  const userId = session?.user?.id;

  if (!userId) {
    redirect("/login");
  }

  const subscription = await getSubscription({ userId });

  return (
    <div>
      {subscription?.status !== "active" && <GridPlans />}

      {subscription?.status === "active" && subscription && (
        <SubscriptionDetail subscription={subscription} />
      )}
    </div>
  );
}
