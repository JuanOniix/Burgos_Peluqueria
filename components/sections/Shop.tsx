import { BadgeCheck, MapPin, MessageCircle } from "lucide-react";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ProductCard } from "@/components/shared/ProductCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { products } from "@/data/products";

const benefits = [
  {
    icon: BadgeCheck,
    title: "Productos originales",
    description: "Las mismas marcas que usamos en el salón.",
  },
  {
    icon: MessageCircle,
    title: "Pedido por WhatsApp",
    description: "Agrega al carrito y coordina el pago con nosotros.",
  },
  {
    icon: MapPin,
    title: "Recoge en el salón",
    description: "Retira tu pedido cuando vengas a tu próxima cita.",
  },
];

export function Shop() {
  return (
    <section id="tienda" className="bg-secondary/40 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Tienda"
            title="Lleva tus productos favoritos a casa"
            description="Los mismos productos que usamos en tus servicios, listos para cuidar tu cabello entre visitas."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex items-start gap-3 rounded-2xl bg-background p-5 ring-1 ring-border/70"
              >
                <benefit.icon className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="font-heading text-sm font-medium text-foreground">
                    {benefit.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <AnimatedSection key={product.id} delay={index * 0.05}>
              <ProductCard product={product} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
