# Burgos Peluquería

Sitio web de una sola página construido con Next.js, TypeScript, Tailwind CSS y shadcn/ui. Objetivo: mostrar los servicios del salón y convertir visitas en citas agendadas por WhatsApp.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Base de datos MySQL

La aplicación usa **MySQL** como sistema gestor de base de datos y
**InnoDB** como motor de almacenamiento para las tablas del negocio. MySQL se
eligió porque es un motor relacional ampliamente utilizado, adecuado para
datos conectados como clientes, servicios, citas, pedidos y productos; además,
puede ejecutarse localmente con Docker y ofrece soporte transaccional. InnoDB
aporta las propiedades **ACID** necesarias para registrar operaciones sin
dejar datos relacionados a medio guardar.

### ¿Cómo se aplica ACID?

- **Atomicidad:** guardar una cita y sus datos relacionados, o un pedido y sus
  productos, se hace dentro de una transacción. Si falla antes del `COMMIT`, se
  revierte con `ROLLBACK`.
- **Consistencia:** claves foráneas, claves únicas y restricciones mantienen
  relaciones válidas; los precios y cantidades se validan antes de guardar.
- **Aislamiento:** MySQL ejecuta cada operación dentro de su propia
  transacción; la lectura de productos para crear un pedido usa `FOR UPDATE`
  para proteger los precios consultados mientras se registra ese pedido.
- **Durabilidad:** después de confirmar una transacción, InnoDB conserva los
  cambios en la base; en el entorno Docker los archivos se mantienen en el
  volumen `mysql_data`.

Las rutas `POST /api/appointments` y `POST /api/orders` usan transacciones. El
pedido se calcula en el servidor usando los precios actuales de MySQL y se
guarda con una copia del nombre y precio de cada producto. No se confía en los
precios enviados por el navegador.

### Iniciar MySQL localmente con Docker

Desde la carpeta `Burgos_Peluqueria`:

```powershell
Copy-Item .env.docker.example .env
Copy-Item .env.example .env.local
docker compose up -d mysql
npm run dev
```

`docker-compose.yml` crea la base `burgos_peluqueria` y ejecuta
`database/init/001_schema.sql` en la primera inicialización del volumen. Las
credenciales de ejemplo son exclusivamente para desarrollo local. Antes de
exponer MySQL en una red o desplegar la web, configura contraseñas fuertes y
los secretos desde el proveedor de hosting. Para una instancia gestionada,
ajusta las variables `MYSQL_*` de `.env.local` y activa `MYSQL_SSL=true` cuando
el proveedor requiera TLS.

El puerto local predeterminado es `3306`. Si ya está ocupado, cambia
`MYSQL_PORT` en `.env` y `.env.local` al mismo puerto libre. Al modificar el
esquema, aplica las migraciones a la base existente: los scripts de
`docker-entrypoint-initdb.d` solo se ejecutan cuando MySQL inicializa un
volumen vacío.

### Qué persiste

- **Citas:** nombre, teléfono, servicio, fecha/hora solicitada, nota y fecha de
  autorización para procesar los datos. La cita queda en estado `requested`;
  no se confirma ni se bloquea disponibilidad hasta que el salón la confirme
  por WhatsApp.
- **Pedidos:** cliente, estado, subtotal y detalle de productos con nombre y
  precio históricos. La web valida precios contra MySQL y después permite
  enviar el resumen guardado por WhatsApp.

Las tablas principales son `customers`, `services`, `appointments`, `products`,
`orders` y `order_items`. El esquema inicial carga los servicios y productos
actuales; si actualizas el catálogo en `data/products.ts` o
`data/services.ts`, refleja también esos cambios en
`database/init/001_schema.sql` y actualiza la base ya creada.

Las respuestas de `POST /api/appointments` y `POST /api/orders` no se cachean:
cada solicitud debe validarse y escribirse en MySQL. Antes de producción,
publica una política de privacidad que describa el uso y conservación de los
datos personales y configura copias de seguridad de MySQL.

## Persistencia local del carrito

El carrito se conserva en el navegador mediante `localStorage`, con la clave
`burgos-cart`. Esta funcionalidad vive en [`lib/cart-context.tsx`](lib/cart-context.tsx):

1. Al cargar la página, `CartProvider` lee los productos guardados y los carga
   en el estado de React. La bandera `hydrated` evita guardar el carrito vacío
   inicial antes de terminar esa lectura.
2. Al agregar productos, quitarlos, cambiar cantidades o vaciar el carrito,
   `useReducer` actualiza el estado compartido del carrito.
3. Después de hidratarlo, un efecto persiste los cambios en `localStorage`
   como JSON. Así, el carrito sobrevive a una recarga o a cerrar y volver a
   abrir el mismo navegador.
4. El subtotal y la cantidad total se calculan a partir del estado en memoria;
   `useMemo` reutiliza ese resultado hasta que cambien los artículos.
5. Al registrar correctamente un pedido en MySQL, la interfaz vacía el carrito
   local. Si guardar el pedido falla, conserva los artículos para permitir
   reintentar.

Esto es **persistencia local del estado**, no una caché de servidor ni una
sincronización entre dispositivos. El contenido de `localStorage` puede ser
modificado por la persona usuaria y no debe considerarse confiable: por eso la
API solo recibe identificadores y cantidades, vuelve a consultar los productos
y precios en MySQL, y calcula el subtotal en el servidor. Los precios guardados
en el navegador sirven para mostrar el carrito, pero no determinan el total
oficial del pedido.

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
