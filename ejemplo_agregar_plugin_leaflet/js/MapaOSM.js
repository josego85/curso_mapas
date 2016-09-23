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

	// Agregamos para la edicion
	var drawnItems = new L.FeatureGroup();
	mapa.addLayer(drawnItems);
	var drawControl = new L.Control.Draw({
	    edit: {
	        featureGroup: drawnItems
	    }
	});
	mapa.addControl(drawControl);
}
