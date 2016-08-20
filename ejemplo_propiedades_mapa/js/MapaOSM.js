// Variables y Objetos globales.
var mapa = null;

function cargarMapa(){
	// Asuncion - Paraguay.
	var longitud = -57.6309129;
	var latitud = -25.2961407;
	var bounds = new L.LatLngBounds(new L.LatLng(-24.631,-58.399), new L.LatLng(-22.400,-58.399));
	var zoom = 5;

    // Se instancia el objeto mapa.
	mapa =  L.map('map-container', {
		minZoom: 4,
		maxZoom: 7,
		maxBounds: bounds
	}).setView([latitud, longitud], zoom);

	// Humanitarian Style.
	L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright">' +
          'OpenStreetMap Contributors </a> Tiles \u00a9 HOT'
	}).addTo(mapa);
}
