CREATE DATABASE IF NOT EXISTS petapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE petapp;

CREATE TABLE IF NOT EXISTS animals (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age VARCHAR(40) NOT NULL DEFAULT 'Sin dato',
  breed VARCHAR(100) NOT NULL DEFAULT 'Mestizo',
  sex ENUM('Macho', 'Hembra') NOT NULL DEFAULT 'Macho',
  stage ENUM('Nuevo', 'Corte de pelo', 'Bañado', 'Revisión veterinaria', 'Vacunado', 'Castrado') NOT NULL DEFAULT 'Nuevo',
  image VARCHAR(500) NOT NULL DEFAULT '',
  rescued VARCHAR(60) NOT NULL DEFAULT 'hoy',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS expenses (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  category ENUM('Comida', 'Veterinario', 'Vacunas', 'Traslados') NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  expense_date DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX expenses_date_idx (expense_date),
  INDEX expenses_category_idx (category)
);