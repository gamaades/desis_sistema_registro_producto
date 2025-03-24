<?php

header('Content-Type: application/json');

// Obtener el código del parámetro de la URL
$codigo = $_GET['codigo'];

// Conexión a la base de datos
include('../config/db_config.php');

// Consulta para verificar si el código existe
$query = "SELECT COUNT(*) AS count FROM producto WHERE codigo = $1";
$result = pg_query_params($conn, $query, [$codigo]);

if (!$result) {
    echo json_encode(['error' => 'Error en la consulta']);
    exit;
}

$row = pg_fetch_assoc($result);
$exists = $row['count'] > 0;

// Cerrar conexión
pg_close($conn);

// Retornar si existe o no el código
echo json_encode(['exists' => $exists]);
?>
