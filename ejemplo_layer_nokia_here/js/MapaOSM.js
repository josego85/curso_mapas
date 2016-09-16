// Variables y Objetos globales.
var mapa = null;

function cargarMapa(){
	// Asuncion - Paraguay.
	var longitud = -57.6309129;
	var latitud = -25.2961407;
	var zoom = 14;

    // Se instancia el objeto mapa.
	mapa =  L.map('map-container').setView([latitud, longitud], zoom);

	// Layer Nokia Here..
    L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/{type}/{mapID}/{scheme}/{z}/{x}/{y}/{size}/{format}?app_id={app_id}&app_code={app_code}&lg={language}', {
        attribution: 'Map &copy; 2016 <a href="http://developer.here.com">HERE</a>',
        subdomains: '1234',
        base: 'base',
        type: 'maptile',
        scheme: 'normal.day',
        app_id: '{app_id}',
        app_code: '{app_code}',
        mapID: 'newest',
        maxZoom: 20,
        language: 'eng',
        format: 'png8',
        size: '256'
    }).addTo(mapa);
    var marcador = L.marker([latitud, longitud]).addTo(mapa);
}
