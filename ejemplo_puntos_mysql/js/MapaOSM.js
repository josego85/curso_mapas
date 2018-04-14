// Variables y Objetos globales.
var mapa = null;

function cargarMapa(){
	// Asuncion - Paraguay.
	var longitud = -57.6309129;
	var latitud = -25.2961407;
	var zoom = 7;

    // Se instancia el objeto mapa.
	mapa =  L.map('map-container').setView([latitud, longitud], zoom);

	// Humanitarian Style.
	L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright">' +
          'OpenStreetMap Contributors </a> Tiles \u00a9 HOT'
	}).addTo(mapa);

	// Estilo.
	var style = {
	    radius: 5,
	    fillColor: "yellow",
	    color: "#000",
	    weight: 1,
	    opacity: 1,
	    fillOpacity: 0.7
	};

	// Se obtiene todos los eventos.
	var layer_eventos;
	$.getJSON("server/consultar_eventos.php", function(p_data_eventos){
	    layer_eventos = L.geoJson(p_data_eventos, {
			pointToLayer: function(feature, latlng){
			    return L.circleMarker(latlng, style);
			}
		}).addTo(mapa);
	});
}
