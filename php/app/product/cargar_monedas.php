<?php

header('Content-Type: application/json');

include('../config/db_config.php');

// Consulta SQL para obtener las monedas
$query = "SELECT id, nombre_moneda as nombre FROM moneda";
$result = pg_query($conn, $query);

if (!$result) {
    echo json_encode(['error' => 'Error en la consulta']);
    exit;
}

// Obtener las monedas
$monedas = [];
while ($row = pg_fetch_assoc($result)) {
    $monedas[] = $row;
}

// Cerrar la conexión
pg_close($conn);

// Enviar los resultados como JSON
echo json_encode($monedas);

?>