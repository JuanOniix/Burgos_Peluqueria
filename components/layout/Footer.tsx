import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Phone } from "lucide-react";

import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { FacebookIcon, InstagramIcon } from "@/components/shared/SocialIcons";
import { siteConfig } from "@/lib/config";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contacto"
      className="border-t border-footer-border bg-footer-background"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="inline-block rounded-xl bg-white p-3">
              <Image
                src="/logo.png"
                alt={siteConfig.name}
                width={220}
                height={224}
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="mt-4 max-w-xs text-sm text-footer-muted">
              {siteConfig.tagline}. Agenda tu cita en segundos y déjanos
              cuidar tu imagen.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <WhatsAppButton size="sm" className="px-4 py-2 text-sm" />
              <Link
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-footer-foreground transition-colors hover:bg-gold hover:text-gold-foreground"
              >
                <InstagramIcon className="size-4" />
              </Link>
              <Link
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Facebook"
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-footer-foreground transition-colors hover:bg-gold hover:text-gold-foreground"
              >
                <FacebookIcon className="size-4" />
              </Link>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <h3 className="font-heading text-base font-medium text-footer-foreground">
              Contacto
            </h3>
            <Link
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 text-footer-muted hover:text-footer-foreground"
            >
              <Phone className="mt-0.5 size-4 shrink-0" />
              {siteConfig.whatsappNumberDisplay}
            </Link>
            <p className="flex items-start gap-2.5 text-footer-muted">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              {siteConfig.address.line}
            </p>
            <p className="flex items-start gap-2.5 text-footer-muted">
              <Clock className="mt-0.5 size-4 shrink-0" />
              {siteConfig.hours.display}
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <h3 className="font-heading text-base font-medium text-footer-foreground">
              Navegación
            </h3>
            <ul className="space-y-2 text-footer-muted">
              <li>
                <Link href="#servicios" className="hover:text-footer-foreground">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="#galeria" className="hover:text-footer-foreground">
                  Galería
                </Link>
              </li>
              <li>
                <Link href="#nosotros" className="hover:text-footer-foreground">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="#ubicacion" className="hover:text-footer-foreground">
                  Ubicación
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-footer-border pt-6 text-center text-xs text-footer-muted">
          © {year} {siteConfig.name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
