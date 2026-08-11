import Image from "next/image";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { VerticalLabel } from "@/components/shared/VerticalLabel";
import { services, type Service } from "@/data/services";

function ServiceTile({
  service,
  featured = false,
  imageClassName,
}: {
  service: Service;
  featured?: boolean;
  imageClassName?: string;
}) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl">
      <div className={imageClassName ?? "relative aspect-[4/3] w-full"}>
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes={
            featured
              ? "(min-width: 1024px) 50vw, 100vw"
              : "(min-width: 1024px) 25vw, 50vw"
          }
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute top-4 left-4">
          <VerticalLabel className="text-white/70">
            {service.title}
          </VerticalLabel>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3
            className={`font-heading font-medium text-white ${
              featured ? "text-3xl" : "text-xl"
            }`}
          >
            {service.title}
          </h3>
          <p
            className={`mt-1.5 text-white/80 ${
              featured ? "max-w-sm text-sm" : "text-xs"
            }`}
          >
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const [cortes, coloracion, balayage, keratina, peinados, barberia] =
    services;

  return (
    <section id="servicios" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Servicios"
            title="Todo lo que tu cabello necesita"
            description="Servicios profesionales pensados para realzar tu estilo, con productos y técnicas de calidad."
          />
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <AnimatedSection>
            <ServiceTile
              service={cortes}
              featured
              imageClassName="relative aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[420px]"
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:h-full lg:grid-cols-1 lg:grid-rows-2">
            <AnimatedSection delay={0.05}>
              <ServiceTile
                service={coloracion}
                imageClassName="relative aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[200px]"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <ServiceTile
                service={balayage}
                imageClassName="relative aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[200px]"
              />
            </AnimatedSection>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[keratina, peinados, barberia].map((service, index) => (
            <AnimatedSection key={service.slug} delay={0.15 + index * 0.05}>
              <ServiceTile service={service} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
