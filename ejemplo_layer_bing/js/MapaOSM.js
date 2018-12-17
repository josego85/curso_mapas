// Variables y objetos globales.
var mapa = null;

function cargarMapa(){
	// Asuncion - Paraguay.
	var longitud = -57.6309129;
	var latitud = -25.2961407;
	var zoom = 14;

	// Para obtener una key. https://www.bingmapsportal.com/Application
	var key = 'xxxxxxxxxxx';

    // Se instancia el objeto mapa.
	mapa =  L.map('map-container').setView([latitud, longitud], zoom);

	// Bing layer.
	L.tileLayer.bing(key).addTo(mapa);
}
