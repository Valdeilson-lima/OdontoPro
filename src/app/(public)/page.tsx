import { Clinics } from "./_components/clinics";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { getClinics } from "./_date-access/get-clinics";

export const revalidate = 120

export default async function Home() {
  const clinicsResult = await getClinics();
  console.log(clinicsResult);

  const clinics = Array.isArray(clinicsResult) ? clinicsResult : [];

  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      <div>
        <Hero />

        <Clinics clinics={clinics} />

        <Footer />
      </div>
    </main>
  );
}
