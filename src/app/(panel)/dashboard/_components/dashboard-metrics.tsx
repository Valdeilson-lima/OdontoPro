import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Bell, Wallet } from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrence";

type DashboardMetricsProps = {
  appointmentsCount?: number;
  activeRemindersCount?: number;
  todayRevenue?: number; // BRL value (e.g., 1234.56)
};

export function DashboardMetrics({
  appointmentsCount = 0,
  activeRemindersCount = 0,
  todayRevenue = 0,
}: DashboardMetricsProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{appointmentsCount}</div>
          <p className="text-xs text-muted-foreground">Hoje</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Lembretes ativos
          </CardTitle>
          <Bell className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeRemindersCount}</div>
          <p className="text-xs text-muted-foreground">Total</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Faturamento do dia
          </CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(todayRevenue)}
          </div>
          <p className="text-xs text-muted-foreground">Hoje</p>
        </CardContent>
      </Card>
    </section>
  );
}
