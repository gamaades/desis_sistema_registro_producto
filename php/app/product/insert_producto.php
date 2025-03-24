<?php

    header('Content-Type: application/json');
    include('../config/db_config.php');

    $data = json_decode(file_get_contents('php://input'), true);

    $codigo      = $data['codigo'] ?? '';
    $nombre      = $data['nombre'] ?? '';
    $precio      = $data['precio'] ?? '';
    $descripcion = $data['descripcion'] ?? '';
    $bodega_id   = $data['bodega_id'] ?? '';
    $sucursal_id = $data['sucursal_id'] ?? '';
    $moneda_id   = $data['moneda_id'] ?? '';

    // Validaciones básicas
    if (!$codigo || !$nombre || !$precio || !$descripcion || !$bodega_id || !$sucursal_id || !$moneda_id) {
        echo json_encode(['success' => false, 'error' => 'Faltan campos obligatorios']);
        exit;
    }

    // Validación de unicidad del código
    $checkQuery = "SELECT 1 FROM producto WHERE codigo = $1";
    $checkResult = pg_query_params($conn, $checkQuery, [$codigo]);

    if (pg_num_rows($checkResult) > 0) {
        echo json_encode(['success' => false, 'error' => 'El código ya existe']);
        exit;
    }

    // Insertar
    $query = "INSERT INTO producto (codigo, nombre, precio, descripcion, bodega_id, sucursal_id, moneda_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id";

    $params = [$codigo, $nombre, $precio, $descripcion, $bodega_id, $sucursal_id, $moneda_id];

    $result = pg_query_params($conn, $query, $params);

    if ($result) {
        $newId = pg_fetch_result($result, 0, 'id');
        echo json_encode(['success' => true, 'id' => $newId]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Error al insertar el producto']);
    }

    pg_close($conn);
?>