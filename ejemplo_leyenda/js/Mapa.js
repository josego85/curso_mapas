// Variables y objetos globales.
var mapa = null;

// Carga el mapa.
function cargarMapa(){
	// Zoom inicial del mapa de todos los barrios de Asuncion.
	var zoom = 10;
	mapa = L.map('map-container', {
	    zoom: zoom,
		attributionControl: false
	});

	// Attribuciones.
	var creditos = L.control.attribution().addTo(mapa);
	creditos.addAttribution("Datos <a href='http://datos.gov.py/dataset/barrios-y-localidades'>DGEEC</a>");

	// Se obtiene todos los barrios de Asuncion.
	$.getJSON("datos/Asuncion.geojson", function(data){
	    var layer_todos_barrios_asu = L.geoJson(data, {
			style: estilo_barrios,
			onEachFeature: popup
		}).addTo(mapa);

		// Leyenda.
		var leyenda = L.control({position: 'bottomright'});
		leyenda.onAdd = function (mapa) {
		    var div = L.DomUtil.create('div', 'info leyenda');
		    var grades = [0, 50, 500, 1000, 2000, 3000, 4000, 5000];
			var labels = [];
			var from;
			var to;
			for (var i = 0; i < grades.length; i++) {
				from = grades[i];
				to = grades[i + 1];
				div.innerHTML +=
	              '<i style="background:' + getColor(from + 1) + '"></i> ' +
	              from + (to ? '&ndash;' + to : '+') + '<p>';
			}
			return div;
		};
		leyenda.addTo(mapa);

	    // Se centra el layer de todos los barrios de Asuncion.
	    mapa.fitBounds(layer_todos_barrios_asu.getBounds());
	});

	// Muestra un pop por cada barrio.
	function popup(feature, layer) {
		if (feature.properties && feature.properties.nombre) {
			var info = feature.properties.nombre + " (" +
			  feature.properties.cant_viv + ")";
			layer.bindPopup(info);
		}else if(feature){
			layer.bindPopup(feature);
		}
	}

	// Funcion que devuelve el estilo de un barrio.
	function estilo_barrios(feature){
		return {
	        fillColor: getColor(feature.properties.cant_viv),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    };
	}

	// Funcion que devuelve el color dependiendo
	// de la cantidad de viviendas.
	function getColor(cant_viviendas) {
		return cant_viviendas > 5000 ? '#800026' :
           cant_viviendas > 4000  ? '#BD0026' :
           cant_viviendas > 3000 ? '#E31A1C' :
           cant_viviendas > 2000  ? '#FC4E2A' :
           cant_viviendas > 1000   ? '#FD8D3C' :
           cant_viviendas > 500   ? '#FEB24C' :
           cant_viviendas > 50   ? '#FED976' :
                      '#FED976';
	}
}
