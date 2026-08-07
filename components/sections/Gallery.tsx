"use client";

import { useState } from "react";
import Image from "next/image";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { galleryImages } from "@/data/gallery";

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected !== null ? galleryImages[selected] : null;

  return (
    <section id="galeria" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Galería"
            title="Trabajos que hablan por sí solos"
            description="Un vistazo a algunos de nuestros resultados. Da clic en cualquier foto para verla en grande."
          />
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {galleryImages.map((image, index) => (
            <AnimatedSection key={image.src} delay={(index % 6) * 0.05}>
              <button
                type="button"
                onClick={() => setSelected(index)}
                className="group relative block aspect-square w-full overflow-hidden rounded-xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-xs font-medium text-white">
                    {image.category}
                  </span>
                </span>
              </button>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="max-w-3xl border-none bg-transparent p-0 ring-0 sm:max-w-3xl">
          <DialogTitle className="sr-only">
            {active?.alt ?? "Foto de la galería"}
          </DialogTitle>
          {active && (
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl sm:aspect-[16/10]">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
