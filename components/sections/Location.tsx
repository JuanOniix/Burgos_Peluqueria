import { MapPin, Clock } from "lucide-react";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { siteConfig } from "@/lib/config";

export function Location() {
  const mapQuery = encodeURIComponent(siteConfig.address.full);
  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

  return (
    <section id="ubicacion" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Ubicación"
            title="Visítanos"
            description="Te esperamos con gusto. Agenda antes para asegurar tu horario."
          />
        </AnimatedSection>

        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          <AnimatedSection
            delay={0.1}
            className="overflow-hidden rounded-2xl lg:col-span-3"
          >
            <iframe
              src={mapSrc}
              title={`Mapa de ubicación de ${siteConfig.name}`}
              className="h-80 w-full border-0 sm:h-full sm:min-h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="lg:col-span-2">
            <div className="flex h-full flex-col justify-center rounded-2xl bg-secondary/40 p-8">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="font-heading text-base font-medium text-foreground">
                    Dirección
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {siteConfig.address.line}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="font-heading text-base font-medium text-foreground">
                    Horario
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {siteConfig.hours.display}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <WhatsAppButton className="w-full justify-center" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
