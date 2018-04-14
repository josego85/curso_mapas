<?php
    $conexion = new mysqli('127.0.0.1', 'root', '123456', 'eventos');

    if ($conexion->connect_errno) {
        echo "Lo sentimos, este sitio web está experimentando problemas.";

        // Algo que no se debería de hacer en un sitio público, aunque este ejemplo lo mostrará
        // de todas formas, es imprimir información relacionada con errores de MySQL -- se podría registrar.
        echo "Error: Fallo al conectarse a MySQL debido a: \n";
        echo "Errno: " . $conexion->connect_errno . "\n";
        echo "Error: " . $conexion->connect_error . "\n";

        // Podría ser conveniente mostrar algo interesante, aunque nosotros simplemente saldremos.
        exit;
    }

    // Realizar una consulta SQL
    $sql = "SELECT evento_id, evento_nombre, evento_fecha, evento_longitud, evento_latitud FROM eventos";
    if (!$eventos = $conexion->query($sql)) {
        // ¡Oh, no! La consulta falló.
        echo "Lo sentimos, este sitio web está experimentando problemas.";

        // De nuevo, no hacer esto en un sitio público, aunque nosotros mostraremos
        // cómo obtener información del error
        echo "Error: La ejecución de la consulta falló debido a: \n";
        echo "Query: " . $sql . "\n";
        echo "Errno: " . $mysqli->errno . "\n";
        echo "Error: " . $mysqli->error . "\n";
        exit;
    }

    $geojson = array(
        'type' => 'FeatureCollection',
        'features' => array()
    );

    // Sabemos que nuestra conexión a MySQL y nuestra consulta
    // tuvieron éxito, pero ¿tenemos un resultado?
    if ($eventos->num_rows === 0) {
        echo "Sin eventos.";
        exit;
    }
    while ($p_evento = $eventos->fetch_assoc()) {
        // Se obtiene la fecha.
        $evento_fecha = new DateTime($p_evento['evento_fecha']);
        $fecha = $evento_fecha->format('d-m-Y');

        $evento = array(
            'type' => 'Feature',
            'geometry' => array(
                'type' => 'Point',
                'coordinates' => array(
                    $p_evento['evento_longitud'],
                    $p_evento['evento_latitud']
                )
            ),
            'properties' => array(
                'nombre' => $p_evento['evento_nombre'],
                'fecha' => $fecha
            )
        );
        array_push($geojson['features'], $evento);
    }
    header('Content-type: application/json', true);
    echo json_encode($geojson);
