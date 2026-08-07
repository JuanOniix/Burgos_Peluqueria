# Burgos Peluquería

Sitio web de una sola página construido con Next.js, TypeScript, Tailwind CSS y shadcn/ui. Objetivo: mostrar los servicios del salón y convertir visitas en citas agendadas por WhatsApp.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Editar el contenido

Todo el contenido del negocio está centralizado, así que **no hace falta tocar componentes** para actualizar textos, teléfono, dirección u horario:

| Qué editar | Archivo |
| --- | --- |
| Nombre, WhatsApp, dirección, horario, historia, valores | [`lib/config.ts`](lib/config.ts) |
| Servicios (Cortes, Coloración, Balayage, etc.) | [`data/services.ts`](data/services.ts) |
| Fotos de la galería | [`data/gallery.ts`](data/gallery.ts) |
| Opiniones de clientes | [`data/testimonials.ts`](data/testimonials.ts) |

### Reemplazar las fotos placeholder

Todas las imágenes son fotos de stock de Unsplash usadas como placeholder. Para usar fotos reales del salón:

1. Coloca las imágenes en `public/` (por ejemplo `public/fotos/corte-1.jpg`).
2. En `data/services.ts`, `data/gallery.ts` o en el componente `About`, cambia el valor de `image`/`src` a la ruta local, por ejemplo `"/fotos/corte-1.jpg"`.

No se requiere ningún otro cambio: `next/image` optimiza automáticamente tanto imágenes locales como remotas ya configuradas (Unsplash).

### Actualizar el mapa y la ciudad

`lib/config.ts` → `address.full` se usa para el mapa de Google embebido. Si agregas ciudad/país (por ejemplo `"Cra 57 # 3-22, Bogotá, Colombia"`), el mapa será más preciso.

### Dominio del sitio (SEO)

Cuando el sitio tenga dominio propio, actualiza `lib/config.ts` → `url`. Ese valor alimenta las etiquetas Open Graph, el `sitemap.xml` y el `robots.txt`.

## Estructura del proyecto

```
app/            # Rutas, layout raíz, metadata, sitemap y robots
components/
  layout/       # Navbar y Footer
  sections/     # Hero, Services, Gallery, About, Testimonials, Location
  shared/       # Botones de WhatsApp, animaciones de scroll, encabezados
  ui/           # Componentes base de shadcn/ui
data/           # Servicios, galería y testimonios
lib/            # Configuración central del negocio y helper de WhatsApp
```

## Despliegue en Vercel

1. Sube el proyecto a un repositorio de Git (GitHub, GitLab o Bitbucket).
2. En [vercel.com/new](https://vercel.com/new), importa el repositorio.
3. Vercel detecta Next.js automáticamente — no se requiere configuración adicional.
4. Tras el primer despliegue, actualiza `lib/config.ts` → `url` con el dominio asignado y vuelve a desplegar.

## Comandos

```bash
npm run dev     # servidor de desarrollo
npm run build   # build de producción
npm run start   # servidor de producción (tras build)
npm run lint    # linter
```
