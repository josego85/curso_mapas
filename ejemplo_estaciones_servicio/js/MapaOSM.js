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

	// Estilo de la estaciones de servicio.
	var estaciones_servicio_style = {
	    radius: 5,
	    fillColor: "yellow",
	    color: "#000",
	    weight: 1,
	    opacity: 1,
	    fillOpacity: 0.7
	};

	// Se obtiene las estaciones de servicio de Asuncion y alrededores.
	var layer_estaciones_servicio;
	$.getJSON("Datos/estaciones_servicio.geojson", function(data_estaciones_servicio){
	    layer_estaciones_servicio = L.geoJson(data_estaciones_servicio, {
			pointToLayer: function(feature, latlng){
			    return L.circleMarker(latlng, estaciones_servicio_style);
			}
		}).addTo(mapa);

		// Layer de la Avenida Espanha.
		var avenida_espanha;
		$.getJSON("Datos/avenida_espanha.geojson", function(data_avenida){
		    var estilo = {
				"color": "red",
			   	"weight": 10
		    };
		    avenida_espanha = L.geoJson(data_avenida, {
				style: estilo
			}).addTo(mapa);

			operacion_buffer(data_estaciones_servicio, data_avenida);
		});
	});

	// Operacion buffer.
	function operacion_buffer(data_estaciones_servicio, data_avenida) {
		var radio = 300;
		var buffer = turf.buffer(data_avenida, radio/1000, 'kilometers');
		var bufferLayer = L.geoJson(buffer, {
			onEachFeature: function (feature, layer) {
				layer.bindPopup('Avenida Espanha');
			},
			style: {
            	stroke: false,
                fillOpacity: 0
            }
		}).addTo(mapa);
		var estaciones_servicio_dentro = turf.within(data_estaciones_servicio, buffer);
		var layer_estaciones_servicio_dentro = L.geoJson(estaciones_servicio_dentro, {
			  onEachFeature: function(feature, layer) {
				   var info = "";
				   for(var i in feature.properties){
					   if(!(i === "@id" || i === "amenity")){
						   info += i + ": " + feature.properties[i] + "<br>";
					   }
				   }
				   layer.bindPopup(info);
			  },
			  pointToLayer: function (feature, latlng) {
				  return L.circleMarker(latlng);
			  },
			  style: {
				  radius: 8,
				  fillColor: "red",
				  weight: 1
			  }
		}).addTo(mapa);
	}
}
