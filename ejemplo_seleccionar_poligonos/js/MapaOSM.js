// Variables y Objetos globales.
var mapa = null;

function cargarMapa(){
	// Asuncion - Paraguay.
	var longitud = -57.6309129;
	var latitud = -25.2961407;
	var zoom = 14;

    // Se instancia el objeto mapa.
	mapa =  L.map('map-container').setView([latitud, longitud], zoom);

	// Humanitarian Style.
	L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright">' +
          'OpenStreetMap Contributors </a> Tiles \u00a9 HOT'
	}).addTo(mapa);

	var layerPoligonos;
	var seleccionadoPoligono;

	// Hacer llamada ajax.
	$.ajax({
		url: "datos/poligonos.geojson",
		dataType: 'json',
		type: 'post',
		success: function(datos){
			// Funcion que devuelve el estilo de un poligono.
			function estilo_poligno(feature){
			    return {
			      fillColor: feature.properties.color,
			      weight: 2,
			      opacity: 1,
			      color: 'white',
			      dashArray: '3',
			      fillOpacity: 0.7
			   };
		   	}
			layerPoligonos = L.geoJson(datos, {
			    style: estilo_poligno,
			}).on('click', function (e) {
				resetSeleccion(e);

			    // Se asigna al poligono seleccionado.
			    seleccionadoPoligono = e.layer;

				// Traer en frente al poligono seleccionado.
			    seleccionadoPoligono.bringToFront();

				// Setear estilo para resaltar que esta seleccionado.
			    seleccionadoPoligono.setStyle({
					'color': 'red',
					'fillColor': 'red',
					'weight': 4,
			    });
			}).addTo(mapa);
		},
		error: function(msg) {
			console.log("Error!!!");
		}
	});

	function resetSeleccion(e) {
		// Checkear el poligono seleccionado.
		if (seleccionadoPoligono) {
			// Resetear el poligono al estilo por defecto.
			layerPoligonos.resetStyle(seleccionadoPoligono);
		}
	}
}
