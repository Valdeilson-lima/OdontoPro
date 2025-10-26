"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
  Banknote,
  CalendarCheck2,
  ChevronsLeft,
  ChevronsRight,
  Folder,
  List,
  Settings,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../../../public/logo-odonto.png";

export function SidebarDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <aside
        className={clsx(
          "flex flex-col border-r bg-background transition-all duration-300 p-4 h-full",
          {
            "w-20": isOpen,
            "w-64": !isOpen,
            "hidden md:flex md:fixed": true,
          }
        )}
      >
        <div className="mb-6 mt-4">
          {!isOpen && (
            <Image
              src={logoImg}
              alt="Logo"
              priority
              quality={100}
              
            />
          )}
        </div>

        <Button
          variant="outline"
          className=" bg-gray-100 hover:bg-gray-200 text-zinc-900 self-end mb-2 border-0 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen ? (
            <ChevronsLeft className="w-12 h-12" />
          ) : (
            <ChevronsRight className="w-12 h-12" />
          )}
        </Button>

        {/* Mostrar quando a sidebar estiver fechada */}

        {isOpen && (
          <nav className="flex flex-col gap-1 overflow-hidden mt-2">
            <SidebarLink
              href="/dashboard"
              label="Agedamentos"
              icon={<CalendarCheck2 className="w-6 h-6" />}
              pathname={pathname}
              isOpen={isOpen}
            />
            <SidebarLink
              href="/dashboard/services"
              label="Serviços"
              icon={<Folder className="w-6 h-6" />}
              pathname={pathname}
              isOpen={isOpen}
            />
            <SidebarLink
                href="/dashboard/profile"
                label="Meu Perfil"
                icon={<Settings className="w-6 h-6" />}
                pathname={pathname}
                isOpen={isOpen}
              />
              <SidebarLink
                href="/dashboard/plans"
                label="Meus Planos"
                icon={<Banknote className="w-6 h-6" />}
                pathname={pathname}
                isOpen={isOpen}
              />
          </nav>
        )}

        <Collapsible open={!isOpen}>
          <CollapsibleContent>
            <nav className="flex flex-col gap-1 overflow-hidden">
              <span className="text-lg text-gray-400 font-medium mt-1 uppercase">
                Painel
              </span>
              <SidebarLink
                href="/dashboard"
                label="Agedamentos"
                icon={<CalendarCheck2 className="w-6 h-6" />}
                pathname={pathname}
                isOpen={isOpen}
              />
              <SidebarLink
                href="/dashboard/services"
                label="Serviços"
                icon={<Folder className="w-6 h-6" />}
                pathname={pathname}
                isOpen={isOpen}
              />

              <span className="text-ld text-gray-400 font-medium mt-1 uppercase">
                Configurações
              </span>
              <SidebarLink
                href="/dashboard/profile"
                label="Meu Perfil"
                icon={<Settings className="w-6 h-6" />}
                pathname={pathname}
                isOpen={isOpen}
              />

              <SidebarLink
                href="/dashboard/plans"
                label="Meus Planos"
                icon={<Banknote className="w-6 h-6" />}
                pathname={pathname}
                isOpen={isOpen}
              />
            </nav>
          </CollapsibleContent>
        </Collapsible>
      </aside>

      <div
        className={clsx("flex flex-1 flex-col transition-all duration-300", {
          "md:ml-20": isOpen,
          "md:ml-64": !isOpen,
        })}
      >
        <header className="md:hidden flex items-center justify-between p-4 md:px-6 h-14 z-10 border-b bg-white sticky top-0">
          <Sheet>
            <div className="flex items-center gap-4">
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                  <List className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <h1 className="text-base md:text-lg font-bold">
                Odonto<span className="text-emerald-500">PRÓ</span>
              </h1>
            </div>

            <SheetContent
              side="right"
              className="sm: maxw-sx w-64 text-black bg-white p-4"
            >
              <SheetTitle>
                Odonto<span className="text-emerald-500 font-bold">PRÓ</span>
              </SheetTitle>
              <SheetDescription>Bem-vindo ao painel!</SheetDescription>
              <nav className="grid gap-2 text-base pt-5">
                <SidebarLink
                  href="/dashboard"
                  label="Agedamentos"
                  icon={<CalendarCheck2 className="w-6 h-6" />}
                  pathname={pathname}
                  isOpen={isOpen}
                />

                <SidebarLink
                  href="/dashboard/services"
                  label="Serviços"
                  icon={<Folder className="w-6 h-6" />}
                  pathname={pathname}
                  isOpen={isOpen}
                />

                <SidebarLink
                  href="/dashboard/profile"
                  label="Meu Perfil"
                  icon={<Settings className="w-6 h-6" />}
                  pathname={pathname}
                  isOpen={isOpen}
                />

                <SidebarLink
                  href="/dashboard/plans"
                  label="Meus Planos"
                  icon={<Banknote className="w-6 h-6" />}
                  pathname={pathname}
                  isOpen={isOpen}
                />
              </nav>
              {/* Conteúdo do menu lateral */}
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex-1 bg-gray-100 py-4 px-2 md:p-6">{children}</main>
      </div>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  pathname: string;
  isOpen: boolean;
}

function SidebarLink({
  href,
  icon,
  label,
  pathname,
  isOpen,
}: SidebarLinkProps) {
  return (
    <Link href={href}>
      <div
        className={clsx(
          "flex items-center p-3 rounded-lg hover:text-emerald-600 transition-colors",
          {
            "bg-emerald-100 text-emerald-700 font-medium": pathname === href,
            "text-gray-700 hover:bg-gray-100": pathname !== href,
          }
        )}
      >
        <span className="w-6 h-6">{icon}</span>
        {!isOpen && (
          <span className="ml-2 text-black font-medium">{label}</span>
        )}
      </div>
    </Link>
  );
}
