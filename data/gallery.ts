export type GalleryImage = {
  src: string;
  alt: string;
  category: string;
};

/**
 * Placeholder curado de Unsplash. Reemplaza por fotos reales de trabajos
 * del salón: misma estructura, `src` puede ser una ruta local en /public.
 */
export const galleryImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1595475884562-073c30d45670",
    alt: "Corte de cabello femenino con acabado profesional",
    category: "Cortes",
  },
  {
    src: "https://images.unsplash.com/photo-1554519934-e32b1629d9ee",
    alt: "Balayage con degradado natural",
    category: "Balayage",
  },
  {
    src: "https://images.unsplash.com/photo-1574015974293-817f0ebebb74",
    alt: "Coloración de cabello en salón",
    category: "Coloración",
  },
  {
    src: "https://images.unsplash.com/photo-1562322140-8baeececf3df",
    alt: "Peinado elegante para evento",
    category: "Peinados",
  },
  {
    src: "https://images.unsplash.com/photo-1605980625600-88b46abafa8d",
    alt: "Balayage rubio en cabello largo",
    category: "Balayage",
  },
  {
    src: "https://images.unsplash.com/photo-1638064432604-8da1fc75de09",
    alt: "Tratamiento de keratina brillante",
    category: "Keratina",
  },
  {
    src: "https://images.unsplash.com/photo-1672788694268-ecc234591d31",
    alt: "Peinado recogido de fiesta",
    category: "Peinados",
  },
  {
    src: "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5",
    alt: "Corte y arreglo de barba en barbería",
    category: "Barbería",
  },
  {
    src: "https://images.unsplash.com/photo-1635273051937-a0ddef9573b6",
    alt: "Corte masculino de precisión",
    category: "Barbería",
  },
];
