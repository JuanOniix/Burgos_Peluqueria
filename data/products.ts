export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

/**
 * Catálogo de productos de la tienda.
 *
 * Cómo actualizar cada producto (sin tocar código):
 * 1. Foto: reemplaza el archivo correspondiente dentro de /public/products/
 *    (mismo nombre de archivo, formato .jpg) por la foto real del producto.
 * 2. name / description / price: edítalos abajo. `price` va en pesos
 *    colombianos, solo el número, sin puntos ni "$" (ej: 45000).
 * 3. category: se muestra como etiqueta pequeña sobre el nombre.
 *
 * Estos 6 productos y sus fotos son de ejemplo — reemplázalos por el
 * catálogo real que vende Burgos Peluquería.
 */
export const products: Product[] = [
  {
    id: "shampoo-reparador",
    name: "Shampoo Reparador",
    description: "Limpieza suave que repara la fibra capilar dañada.",
    price: 45000,
    image: "/products/shampoo-reparador.jpg",
    category: "Shampoo",
  },
  {
    id: "acondicionador-hidratante",
    name: "Acondicionador Hidratante",
    description: "Hidratación profunda para un cabello suave y manejable.",
    price: 48000,
    image: "/products/acondicionador-hidratante.jpg",
    category: "Acondicionador",
  },
  {
    id: "tratamiento-keratina",
    name: "Tratamiento de Keratina",
    description: "Alisado y nutrición profunda para mantener el efecto en casa.",
    price: 85000,
    image: "/products/tratamiento-keratina.jpg",
    category: "Tratamiento",
  },
  {
    id: "aceite-capilar",
    name: "Aceite Capilar",
    description: "Brillo y control del frizz, sin dejar sensación grasosa.",
    price: 39000,
    image: "/products/aceite-capilar.jpg",
    category: "Styling",
  },
  {
    id: "crema-para-peinar",
    name: "Crema para Peinar",
    description: "Define el peinado con un acabado natural todo el día.",
    price: 36000,
    image: "/products/crema-para-peinar.jpg",
    category: "Styling",
  },
  {
    id: "mascarilla-nutritiva",
    name: "Mascarilla Nutritiva",
    description: "Tratamiento semanal intensivo para cabello debilitado.",
    price: 52000,
    image: "/products/mascarilla-nutritiva.jpg",
    category: "Tratamiento",
  },
];
