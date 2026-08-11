"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartDrawer } from "@/components/shared/CartDrawer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { siteConfig } from "@/lib/config";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#tienda", label: "Tienda" },
  { href: "#galeria", label: "Galería" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#ubicacion", label: "Ubicación" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-24 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#inicio" className="flex items-center">
          <Image
            src="/logo.png"
            alt={siteConfig.name}
            width={220}
            height={224}
            priority
            className="h-20 w-auto object-contain"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <CartDrawer />
          <WhatsAppButton size="sm" className="px-4 py-2 text-sm">
            Agenda tu cita
          </WhatsAppButton>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <CartDrawer />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Abrir menú"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>{siteConfig.name}</SheetTitle>
            </SheetHeader>
            <ul className="flex flex-col gap-1 px-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 px-4">
              <WhatsAppButton className="w-full justify-center">
                Agenda tu cita
              </WhatsAppButton>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
