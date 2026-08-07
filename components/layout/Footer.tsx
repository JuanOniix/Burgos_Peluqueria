import Link from "next/link";
import { MapPin, Clock, Phone, Scissors } from "lucide-react";

import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { siteConfig } from "@/lib/config";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contacto" className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-heading text-xl font-semibold text-foreground">
              <Scissors className="size-5 text-primary" />
              {siteConfig.name}
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              {siteConfig.tagline}. Agenda tu cita en segundos y déjanos
              cuidar tu imagen.
            </p>
            <div className="mt-6">
              <WhatsAppButton size="sm" className="px-4 py-2 text-sm" />
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <h3 className="font-heading text-base font-medium text-foreground">
              Contacto
            </h3>
            <Link
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 text-muted-foreground hover:text-foreground"
            >
              <Phone className="mt-0.5 size-4 shrink-0" />
              {siteConfig.whatsappNumberDisplay}
            </Link>
            <p className="flex items-start gap-2.5 text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              {siteConfig.address.line}
            </p>
            <p className="flex items-start gap-2.5 text-muted-foreground">
              <Clock className="mt-0.5 size-4 shrink-0" />
              {siteConfig.hours.display}
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <h3 className="font-heading text-base font-medium text-foreground">
              Navegación
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="#servicios" className="hover:text-foreground">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="#galeria" className="hover:text-foreground">
                  Galería
                </Link>
              </li>
              <li>
                <Link href="#nosotros" className="hover:text-foreground">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="#ubicacion" className="hover:text-foreground">
                  Ubicación
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {year} {siteConfig.name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
