"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, User, Phone, LogInIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { handleRegister } from "../_actions/login";

export function Header() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "profissionais", title: "Profissionais", icon: User },
    { href: "contato", title: "Contato", icon: Phone },
  ];

  async function handleLogin() {
    await handleRegister("github");
  }

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant="link"
          asChild
          onClick={() => setIsMenuOpen(false)}
        >
          <Link
            href={item.href}
            className="bg-transparent hover:bg-transparent text-black shadow-none"
          >
            {item.title}
          </Link>
        </Button>
      ))}
      {status === "loading" ? (
        <div className="text-base flex items-center gap-2">
          <LogInIcon className="w-4 h-4 animate-spin" />
        </div>
      ) : session ? (
        <Link
          href="/dashboard"
          className="text-base  flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-3 py-2 rounded-md"
        >
          <LogInIcon className="w-4 h-4" />
          Acessar Clinica
        </Link>
      ) : (
        <Button
          className="bg-black hover:bg-gray-800 text-white"
          onClick={handleLogin}
        >
          <LogInIcon className="w-4 h-4" />
          Portal da Clinica
        </Button>
      )}
    </>
  );

  const MobileNavLinks = () => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors group"
          >
            <Icon className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="font-medium">{item.title}</span>
          </Link>
        );
      })}
      {session ? (
        <Link
          href="/dashboard"
          className="text-base  flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-3 py-2 rounded-md"
        >
          <LogInIcon className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
          Acessar Clinica
        </Link>
      ) : (
        <Button
          className="bg-black hover:bg-gray-800 text-white"
          onClick={handleLogin}
        >
          <LogInIcon className="w-4 h-4" />
          Portal da Clinica
        </Button>
      )}
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-[999] py-4 px-6 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-zinc-900">
          Odonto<span className="text-emerald-500">PRO</span>
        </Link>

        <nav className="hidden md:flex space-x-4">
          <NavLinks />
        </nav>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              className="text-black hover:bg-transparent"
              variant={"ghost"}
              size={"icon"}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[280px] sm:w-[320px] bg-white border-l border-gray-200 p-0 z-[1000]"
          >
            <div className="flex flex-col h-full">
              {/* Header do Sheet */}
              <div className="p-6 border-b border-gray-100">
                <SheetTitle className="text-2xl font-bold text-gray-900 mb-1">
                  Menu
                </SheetTitle>
                <SheetDescription className="text-gray-500 text-sm">
                  Veja nossas opções de navegação
                </SheetDescription>
              </div>

              {/* Conteúdo Principal */}
              <div className="flex-1 p-6">
                <nav className="space-y-3">
                  <MobileNavLinks />
                </nav>
              </div>

              {/* Footer do Sheet */}
              <div className="p-6 border-t border-gray-100">
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Agendar Consulta
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
