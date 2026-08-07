export type Service = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

/**
 * Imágenes de Unsplash como placeholder — reemplaza `image` por fotos reales
 * de trabajos del salón cuando estén disponibles (misma forma de URL o ruta
 * local en /public).
 */
export const services: Service[] = [
  {
    slug: "cortes",
    title: "Cortes",
    description:
      "Cortes a la medida de tu rostro y estilo de vida, con acabado profesional.",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f",
  },
  {
    slug: "coloracion",
    title: "Coloración",
    description:
      "Color uniforme y duradero, desde tonos naturales hasta cambios completos de imagen.",
    image: "https://images.unsplash.com/photo-1617391654484-2894196c2cc9",
  },
  {
    slug: "balayage",
    title: "Balayage",
    description:
      "Técnica de iluminación manual para un degradado natural y luminoso.",
    image: "https://images.unsplash.com/photo-1605980766335-d3a41c7332a1",
  },
  {
    slug: "keratina",
    title: "Keratina",
    description:
      "Tratamiento alisador que nutre, elimina el frizz y devuelve el brillo al cabello.",
    image: "https://images.unsplash.com/photo-1564141696939-9eb6e957ccfc",
  },
  {
    slug: "peinados",
    title: "Peinados",
    description:
      "Peinados para toda ocasión: eventos, fiestas y looks del día a día.",
    image: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3",
  },
  {
    slug: "barberia",
    title: "Barbería",
    description:
      "Cortes y arreglo de barba con precisión, para una imagen masculina impecable.",
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486",
  },
];
