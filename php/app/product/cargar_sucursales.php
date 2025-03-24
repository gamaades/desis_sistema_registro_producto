<?php

header('Content-Type: application/json');

include('../config/db_config.php');

// Verificar si se recibe el parámetro bodega_id
$bodega_id = isset($_GET['bodega_id']) ? $_GET['bodega_id'] : null;

if ($bodega_id) {
    // Consulta SQL para obtener las sucursales de la bodega seleccionada
    $query = "SELECT id, nombre_sucursal AS nombre FROM sucursal WHERE bodega_id = $bodega_id";
} else {
    // Si no se pasa el bodega_id, se pueden devolver todas las sucursales
    echo json_encode([]);
    exit;
}

$result = pg_query($conn, $query);

if (!$result) {
    echo json_encode(['error' => 'Error en la consulta']);
    exit;
}

// Obtener las sucursales
$sucursales = [];
while ($row = pg_fetch_assoc($result)) {
    $sucursales[] = $row;
}

// Cerrar la conexión
pg_close($conn);

// Enviar los resultados como JSON
echo json_encode($sucursales);
?>