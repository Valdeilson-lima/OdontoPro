import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

console.log(session.user.status);

  return (
    <main>
      <h1>Welcome to the Dashboard</h1>
      <div className="w-full h-[600px] bg-gray-500 mb-10"></div>
      <div className="w-full h-[600px] bg-gray-800 mb-10"></div>
      <div className="w-full h-[600px] bg-gray-900 mb-10"></div>
    </main>
  );
}
