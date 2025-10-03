import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/getSession";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ButtonCopyLink } from "./_components/button-copy-link";
import { Reminders } from "./_components/reminder/reminders";

export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  console.log(session.user.status);

  return (
    <main>
      <div className="space-x-2 flex items-center justify-end">
        <Link href={`/clinic/${session.user?.id}`} target="_blank">
          <Button className="bg-green-600 hover:bg-green-700 text-white cursor-pointer flex-1 md:flex[0]">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Agendar Consulta</span>
          </Button>
        </Link>
        <ButtonCopyLink userId={session.user?.id!} />
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div>Agenda</div>
        <Reminders userId={session.user?.id!} />
      </section>
    </main>
  );
}
