export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

/**
 * Catálogo de ejemplo — reemplaza nombres, precios (COP) e imágenes por los
 * productos reales que vende Burgos Peluquería cuando los tengas.
 */
export const products: Product[] = [
  {
    id: "shampoo-reparador",
    name: "Shampoo Reparador",
    description: "Limpieza suave que repara la fibra capilar dañada.",
    price: 45000,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    category: "Shampoo",
  },
  {
    id: "acondicionador-hidratante",
    name: "Acondicionador Hidratante",
    description: "Hidratación profunda para un cabello suave y manejable.",
    price: 48000,
    image: "https://images.unsplash.com/photo-1655892817271-c66841c2506e",
    category: "Acondicionador",
  },
  {
    id: "tratamiento-keratina",
    name: "Tratamiento de Keratina",
    description: "Alisado y nutrición profunda para mantener el efecto en casa.",
    price: 85000,
    image: "https://images.unsplash.com/photo-1517498327491-f903e1e281cd",
    category: "Tratamiento",
  },
  {
    id: "aceite-capilar",
    name: "Aceite Capilar",
    description: "Brillo y control del frizz, sin dejar sensación grasosa.",
    price: 39000,
    image: "https://images.unsplash.com/photo-1610595426075-eed5a3f521ee",
    category: "Styling",
  },
  {
    id: "crema-para-peinar",
    name: "Crema para Peinar",
    description: "Define el peinado con un acabado natural todo el día.",
    price: 36000,
    image: "https://images.unsplash.com/photo-1624939461078-66a124b3539c",
    category: "Styling",
  },
  {
    id: "mascarilla-nutritiva",
    name: "Mascarilla Nutritiva",
    description: "Tratamiento semanal intensivo para cabello debilitado.",
    price: 52000,
    image: "https://images.unsplash.com/photo-1585232350744-974fc9804d65",
    category: "Tratamiento",
  },
];
