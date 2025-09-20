import { Clinics } from "./_components/clinics";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      <div>
        <Hero />

        <Clinics />

        <Footer />
      </div>
    </main>
  );
}
