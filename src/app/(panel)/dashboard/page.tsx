import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/getSession";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ButtonCopyLink } from "./_components/button-copy-link";
import { Reminders } from "./_components/reminder/reminders";
import { Appointments } from "./_components/appointments/appointments";
import { DashboardMetrics } from "./_components/dashboard-metrics";
import { getDashboardMetrics } from "./_date_acces/get-dashboard-metrics";
import { checkSubscription } from "@/utils/permissions/checkSubscription";
import { LabelSubscription } from "@/components/ui/labe-subscription";

export const runtime = "nodejs";

export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const subscription = await checkSubscription(session.user?.id!);

  
  const metrics = await getDashboardMetrics({ userId: session.user?.id! });

  return (
    <main>
      <div className="mt-2 mb-4">
        <DashboardMetrics
          appointmentsCount={metrics.appointmentsCount}
          activeRemindersCount={metrics.activeRemindersCount}
          todayRevenue={metrics.todayRevenue}
        />
      </div>
      <div className="space-x-2 flex items-center justify-end">
        <Link href={`/clinic/${session.user?.id}`} target="_blank">
          <Button className="bg-green-600 hover:bg-green-700 text-white cursor-pointer flex-1 md:flex[0]">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Agendar Consulta</span>
          </Button>
        </Link>
        <ButtonCopyLink userId={session.user?.id!} />
      </div>

      {subscription?.subscriptionStatus === "EXPIRED" && (
        <LabelSubscription expired={true} />
      )}

      {subscription?.subscriptionStatus === "TRIAL" && (
        <div className="bg-green-500 text-white text-sm md:text-base px-3 py-3 mt-5 rounded-md">
          <p className="font-semibold">
            {subscription?.message}{" "}
            <Link href="/dashboard/plans" className="underline font-semibold">
              Escolha um plano
            </Link>
          </p>

        </div>
      )}

      {subscription?.subscriptionStatus !== "EXPIRED" && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          <Appointments userId={session.user?.id!} />
          <Reminders userId={session.user?.id!} />
        </section>
      )}
    </main>
  );
}
