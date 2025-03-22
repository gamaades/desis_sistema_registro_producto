-- Database: desis

-- DROP DATABASE IF EXISTS desis;

CREATE DATABASE desis
    WITH
    OWNER = admin
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Eliminar tablas si existen (en orden para respetar las relaciones)
DROP TABLE IF EXISTS producto;
DROP TABLE IF EXISTS sucursal;
DROP TABLE IF EXISTS moneda;
DROP TABLE IF EXISTS bodega;

-- Crear tablas
CREATE TABLE bodega (
    id SERIAL PRIMARY KEY,
    nombre_bodega VARCHAR(255) NOT NULL
);

CREATE TABLE sucursal (
    id SERIAL PRIMARY KEY,
    nombre_sucursal VARCHAR(255) NOT NULL,
    bodega_id INT REFERENCES bodega(id)
);

CREATE TABLE moneda (
    id SERIAL PRIMARY KEY,
    nombre_moneda VARCHAR(50) NOT NULL
);

CREATE TABLE producto (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    descripcion TEXT NOT NULL,
    bodega_id INT REFERENCES bodega(id) ON DELETE SET NULL,
    sucursal_id INT REFERENCES sucursal(id) ON DELETE SET NULL,
    moneda_id INT REFERENCES moneda(id) ON DELETE SET NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos en bodega
INSERT INTO bodega (id, nombre_bodega) VALUES
    (1, 'Bodega Norte'),
    (2, 'Bodega Central'),
    (3, 'Bodega Sur'),
    (4, 'Bodega Oeste'),
    (5, 'Bodega Este');

-- Insertar datos en sucursal
INSERT INTO sucursal (id, nombre_sucursal, bodega_id) VALUES
    (1, 'Sucursal 1', 1),
    (2, 'Sucursal 2', 2),
    (3, 'Sucursal 3', 3),
    (4, 'Sucursal 4', 4),
    (5, 'Sucursal 5', 5),
    (6, 'Sucursal 6', 1),
    (7, 'Sucursal 7', 2);

-- Insertar datos en moneda
INSERT INTO moneda (id, nombre_moneda) VALUES
    (1, 'DÓLAR'),
    (2, 'PESO'),
    (3, 'EURO'),
    (4, 'YEN');