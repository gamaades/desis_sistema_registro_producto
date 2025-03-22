<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

include('../config/db_config.php');

// Consulta SQL para obtener las bodegas
$query = "SELECT id, nombre_bodega AS nombre FROM bodega";
$result = pg_query($conn, $query);

if (!$result) {
    echo json_encode(['error' => 'Error en la consulta']);
    exit;
}

// Obtener las bodegas
$bodegas = [];
while ($row = pg_fetch_assoc($result)) {
    $bodegas[] = $row;
}

// Cerrar la conexión
pg_close($conn);

// Enviar los resultados como JSON
echo json_encode($bodegas);

?>