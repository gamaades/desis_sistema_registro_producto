<?php
// config/database.php

// Configuración de la conexión a PostgreSQL
$host = "172.19.0.2";  // IP del servidor PostgreSQL (ajustar si es necesario), tener en cuenta que si se usa Docker, la IP del servidor PostgreSQL es la misma que la del contenedor Docker.
$port = "5432";         // Puerto (por defecto es 5432 para PostgreSQL)
$dbname = "desis";      // Nombre de la base de datos
$user = "admin";        // Usuario de la base de datos
$password = "admin123"; // Contraseña del usuario

// Crear la conexión
$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$conn) {
    echo json_encode(['error' => 'No se pudo conectar a la base de datos']);
    exit;
}
?>
