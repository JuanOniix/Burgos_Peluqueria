import { Star } from "lucide-react";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section id="opiniones" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Opiniones"
            title="Lo que dicen nuestros clientes"
            description="La confianza de quienes ya vivieron la experiencia Burgos."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mt-16">
          <Carousel opts={{ align: "start", loop: true }} className="mx-auto max-w-4xl">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.name}
                  className="sm:basis-1/2"
                >
                  <Card className="h-full">
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="flex gap-0.5 text-gold">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <Star key={i} className="size-4 fill-current" />
                          )
                        )}
                      </div>
                      <p className="mt-4 flex-1 text-sm text-muted-foreground">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>
                      <p className="mt-4 font-heading text-sm font-medium text-foreground">
                        {testimonial.name}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-8 flex justify-center gap-3">
              <CarouselPrevious className="static translate-x-0 translate-y-0" />
              <CarouselNext className="static translate-x-0 translate-y-0" />
            </div>
          </Carousel>
        </AnimatedSection>
      </div>
    </section>
  );
}
