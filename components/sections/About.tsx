import Image from "next/image";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { siteConfig } from "@/lib/config";

export function About() {
  return (
    <section
      id="nosotros"
      className="relative overflow-hidden bg-secondary/40 py-24 sm:py-32"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-8 left-1/2 -z-0 -translate-x-1/2 font-heading text-[5rem] leading-none font-medium whitespace-nowrap text-foreground/5 select-none sm:text-[8rem] lg:text-[11rem]"
      >
        Nosotros
      </span>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <AnimatedSection>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035"
                alt={`Equipo de ${siteConfig.name} trabajando`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="text-sm font-medium tracking-wide text-primary uppercase">
              Nosotros
            </p>
            <h2 className="mt-2 font-heading text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Cuidando tu imagen con experiencia y calidez
            </h2>
            <div className="mt-6 space-y-4 text-base text-muted-foreground">
              {siteConfig.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {siteConfig.about.values.map((value) => (
                <div key={value.title}>
                  <dt className="font-heading text-base font-medium text-foreground">
                    {value.title}
                  </dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    {value.description}
                  </dd>
                </div>
              ))}
            </dl>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
