CREATE DATABASE IF NOT EXISTS burgos_peluqueria
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE burgos_peluqueria;

CREATE TABLE IF NOT EXISTS customers (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_customers_phone (phone)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS services (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(80) NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  duration_minutes SMALLINT UNSIGNED NOT NULL DEFAULT 60,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_services_slug (slug)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS appointments (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_code CHAR(36) NOT NULL,
  customer_id BIGINT UNSIGNED NOT NULL,
  service_id BIGINT UNSIGNED NOT NULL,
  requested_at DATETIME(3) NOT NULL,
  privacy_consent_at DATETIME(3) NOT NULL,
  status ENUM('requested', 'confirmed', 'cancelled', 'completed')
    NOT NULL DEFAULT 'requested',
  note VARCHAR(500) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_appointments_public_code (public_code),
  KEY ix_appointments_requested_at (requested_at),
  KEY ix_appointments_customer (customer_id),
  CONSTRAINT fk_appointments_customer FOREIGN KEY (customer_id)
    REFERENCES customers (id) ON DELETE RESTRICT,
  CONSTRAINT fk_appointments_service FOREIGN KEY (service_id)
    REFERENCES services (id) ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(80) NOT NULL,
  name VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(80) NOT NULL,
  price_cop INT UNSIGNED NOT NULL,
  image VARCHAR(500) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY ix_products_active (is_active)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS orders (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_code CHAR(36) NOT NULL,
  customer_id BIGINT UNSIGNED NOT NULL,
  status ENUM('requested', 'confirmed', 'paid', 'completed', 'cancelled')
    NOT NULL DEFAULT 'requested',
  currency CHAR(3) NOT NULL DEFAULT 'COP',
  subtotal_cop INT UNSIGNED NOT NULL,
  privacy_consent_at DATETIME(3) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_orders_public_code (public_code),
  KEY ix_orders_customer_created (customer_id, created_at),
  CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id)
    REFERENCES customers (id) ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS order_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id BIGINT UNSIGNED NOT NULL,
  product_id VARCHAR(80) NOT NULL,
  product_name VARCHAR(120) NOT NULL,
  unit_price_cop INT UNSIGNED NOT NULL,
  quantity SMALLINT UNSIGNED NOT NULL,
  line_total_cop INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_order_items_product (order_id, product_id),
  CONSTRAINT chk_order_items_quantity CHECK (quantity > 0),
  CONSTRAINT fk_order_items_order FOREIGN KEY (order_id)
    REFERENCES orders (id) ON DELETE CASCADE,
  CONSTRAINT fk_order_items_product FOREIGN KEY (product_id)
    REFERENCES products (id) ON DELETE RESTRICT
) ENGINE=InnoDB;

INSERT INTO services (slug, name, description) VALUES
  ('cortes', 'Cortes', 'Cortes a la medida de tu rostro y estilo de vida, con acabado profesional.'),
  ('coloracion', 'Coloración', 'Color uniforme y duradero, desde tonos naturales hasta cambios completos de imagen.'),
  ('balayage', 'Balayage', 'Técnica de iluminación manual para un degradado natural y luminoso.'),
  ('keratina', 'Keratina', 'Tratamiento alisador que nutre, elimina el frizz y devuelve el brillo al cabello.'),
  ('peinados', 'Peinados', 'Peinados para toda ocasión: eventos, fiestas y looks del día a día.'),
  ('barberia', 'Barbería', 'Cortes y arreglo de barba con precisión, para una imagen masculina impecable.')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  description = VALUES(description),
  is_active = TRUE;

INSERT INTO products (id, name, description, category, price_cop, image) VALUES
  ('shampoo-reparador', 'Shampoo Reparador', 'Limpieza suave que repara la fibra capilar dañada.', 'Shampoo', 45000, '/products/shampoo-reparador.jpg'),
  ('acondicionador-hidratante', 'Acondicionador Hidratante', 'Hidratación profunda para un cabello suave y manejable.', 'Acondicionador', 48000, '/products/acondicionador-hidratante.jpg'),
  ('tratamiento-keratina', 'Tratamiento de Keratina', 'Alisado y nutrición profunda para mantener el efecto en casa.', 'Tratamiento', 85000, '/products/tratamiento-keratina.jpg'),
  ('aceite-capilar', 'Aceite Capilar', 'Brillo y control del frizz, sin dejar sensación grasosa.', 'Styling', 39000, '/products/aceite-capilar.jpg'),
  ('crema-para-peinar', 'Crema para Peinar', 'Define el peinado con un acabado natural todo el día.', 'Styling', 36000, '/products/crema-para-peinar.jpg'),
  ('mascarilla-nutritiva', 'Mascarilla Nutritiva', 'Tratamiento semanal intensivo para cabello debilitado.', 'Tratamiento', 52000, '/products/mascarilla-nutritiva.jpg')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  description = VALUES(description),
  category = VALUES(category),
  price_cop = VALUES(price_cop),
  image = VALUES(image),
  is_active = TRUE;
