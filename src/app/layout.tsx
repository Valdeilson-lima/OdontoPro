import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionAuthProvider from "@/components/session-auth";
import { Toaster } from "sonner";
import { QueryClientContext } from "@/providers/queryClients";
import { title } from "process";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OdontoApp - Gestão para Clínicas Odontológicas",
  description: "Gerenciamento de consultas e prontuários para clínicas odontológicas",
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  openGraph: {
    title: "OdontoApp - Gestão para Clínicas Odontológicas",
    description: "Gerenciamento de consultas e prontuários para clínicas odontológicas",
    url: "https://odonto-pro-liard.vercel.app",
    siteName: "OdontoApp",
    locale: "pt_BR",
    type: "website",
    images: [
      `${process.env.NEXT_PUBLIC_URL}/doctor-hero.png`
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionAuthProvider>
          <QueryClientContext>
            <Toaster position="top-right" richColors duration={3000} />
            {children}
          </QueryClientContext>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
