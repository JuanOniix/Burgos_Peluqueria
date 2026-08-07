export type Testimonial = {
  name: string;
  text: string;
  rating: number;
};

/**
 * Testimonios de ejemplo — reemplaza por opiniones reales de clientas/es
 * en cuanto las tengas. Mantén el mismo formato { name, text, rating }.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Camila R.",
    text: "Excelente atención y el balayage me quedó espectacular. Ya tengo mi salón de confianza.",
    rating: 5,
  },
  {
    name: "Laura M.",
    text: "Fui por el tratamiento de keratina y el resultado superó mis expectativas. Muy profesionales.",
    rating: 5,
  },
  {
    name: "Andrés G.",
    text: "El servicio de barbería es impecable, siempre salgo conforme con el corte.",
    rating: 5,
  },
  {
    name: "Valentina P.",
    text: "Me encanta cómo cuidan cada detalle. Agendar por WhatsApp fue súper fácil.",
    rating: 5,
  },
];
