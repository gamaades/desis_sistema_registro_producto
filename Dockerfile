# Usa la imagen base de PHP con Apache
FROM php:8.1-apache

# Instala las dependencias necesarias para PostgreSQL
RUN apt-get update && apt-get install -y libpq-dev

# Instala las extensiones de PostgreSQL para PHP
RUN docker-php-ext-install pgsql pdo_pgsql

# Habilita mod_rewrite de Apache (si es necesario)
RUN a2enmod rewrite
