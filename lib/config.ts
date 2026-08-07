/**
 * Única fuente de verdad para los datos del negocio.
 * Edita este archivo para actualizar el sitio: no hay textos de negocio
 * repartidos en los componentes.
 */
export const siteConfig = {
  name: "Burgos Peluquería",
  shortName: "Burgos",
  tagline: "Estilo, belleza y confianza",
  description:
    "En Burgos Peluquería cuidamos tu imagen con cortes, coloración, balayage, keratina, peinados y barbería. Agenda tu cita por WhatsApp.",

  // Cambia esta URL si más adelante conectas un dominio propio (afecta SEO/OG).
  url: "https://burgos-peluqueria.vercel.app",

  // WhatsApp: solo dígitos con código de país, sin "+" ni espacios.
  whatsappNumber: "573113193927",
  whatsappNumberDisplay: "+57 311 319 3927",
  whatsappDefaultMessage: "Hola, quisiera agendar una cita.",

  address: {
    line: "Cra 57 # 3-22",
    // Completa ciudad/país aquí cuando los tengas para mejorar precisión del mapa.
    full: "Cra 57 # 3-22,Cali, Colombia",
  },

  hours: {
    // Mismo horario todos los días según lo indicado. Ajusta si varía por día.
    display: "Todos los días: 8:00 am – 9:00 pm",
    opens: "08:00",
    closes: "21:00",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
     
    ],
  },

  social: {
    instagram: "https://www.instagram.com/burgos_peluqueria/",
    facebook: "https://www.facebook.com/profile.php?id=100064290690648",
  },

  // Texto de ejemplo — reemplázalo por la historia real del salón.
  about: {
    paragraphs: [
      "Burgos Peluquería nació con un propósito simple: hacer que cada persona se sienta segura y renovada al salir por la puerta. Con el paso de los años nos hemos convertido en un punto de encuentro para quienes buscan cuidado profesional y atención cercana.",
      "Nuestro equipo se mantiene en constante formación en las últimas técnicas de corte, color y tratamiento capilar, para ofrecerte siempre resultados de calidad en un ambiente cómodo y de confianza.",
    ],
    values: [
      {
        title: "Calidad profesional",
        description: "Técnicas actualizadas y productos de calidad en cada servicio.",
      },
      {
        title: "Atención cercana",
        description: "Escuchamos lo que buscas para lograr el resultado que quieres.",
      },
      {
        title: "Confianza",
        description: "Clientas y clientes que vuelven porque saben qué esperar.",
      },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
