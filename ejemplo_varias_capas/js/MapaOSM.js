// Variables y Objetos globales.
var mapa = null;

function cargarMapa(){
	// Asuncion - Paraguay.
	var longitud = -57.6309129;
	var latitud = -25.2961407;
	var zoom = 14;
	
	// Humanitarian layer.
	var humanitarian_layer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
		attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright">' +
		  'OpenStreetMap Contributors </a> Tiles \u00a9 HOT'
	});

	// Mapnik layer.
	var mapnik_layer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright">' +
		  'OpenStreetMap Contributors </a>'
	});

	// MapQuest layer.
	var mapquest_layer = L.tileLayer( 'http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
    	attribution: '&copy; <a href="http://osm.org/copyright" title="OpenStreetMap" target="_blank">OpenStreetMap</a> contributors | Tiles Courtesy of <a href="http://www.mapquest.com/" title="MapQuest" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png" width="16" height="16">',
    	subdomains: ['otile1','otile2','otile3','otile4']
	});

    // Se instancia el objeto mapa.
	mapa = L.map('map-container', {
	    center: new L.LatLng(latitud, longitud),
	    zoom: zoom,
	    layers: [mapnik_layer]
	});

	var baseMaps = {
		"Mapnik": mapnik_layer,
    	"Humanitarian": humanitarian_layer,
		"MapQuest": mapquest_layer
	};

	var control = L.control.layers(baseMaps, {}, {
		collapsed: true
	});
	control.addTo(mapa);
}
