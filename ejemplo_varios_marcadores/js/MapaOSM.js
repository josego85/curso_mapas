// Variables y Objetos globales.
var mapa = null;

function cargarMapa(){
	// Asuncion - Paraguay.
	var longitud = -57.6309129;
	var latitud = -25.2961407;
	var zoom = 12;

    // Se instancia el objeto mapa.
	mapa =  L.map('map-container').setView([latitud, longitud], zoom);

	// Humanitarian Style.
	L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright">' +
          'OpenStreetMap Contributors </a> Tiles \u00a9 HOT'
	}).addTo(mapa);

	// Datos GeoJSON.
	var geojsonFeature = {
		"type": "FeatureCollection",
		"features": [{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates":[
				    "-57.521591",
				    "-25.335409"
				]
		    },
			"properties": {
			    "nombre": "Startup Weekend Asunci\u00f3n",
				"lugar": "Aula Magna de la Facultad Polit\u00e9cnica de la Universidad Nacional de Asunci\u00f3n",
				"fecha_inicio": "04-04-2014",
				"fecha_fin": "06-04-2014"
			}
		},{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [
				    "-57.521591",
				    "-25.335409"
				]
		    },
			"properties":{
			    "nombre": "Festival Latinoamericano de Instalaci\u00f3n de Software Libre (FLISOL)",
				"lugar": "Aula Magna de la Facultad Polit\u00e9cnica de la Universidad Nacional de Asunci\u00f3n",
				"fecha_inicio": "26-04-2014",
				"fecha_fin": "26-04-2014"
		    }
		},{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [
		            "-57.521591",
		            "-25.335409"
		        ]
		    },
		    "properties": {
		    	"nombre": "Festival de Danza Paraguaya ",
		    	"lugar": "Aula Magna de la Facultad Polit\u00e9cnica de la Universidad Nacional de Asunci\u00f3n",
		    	"fecha_inicio": "21-06-2014",
		    	"fecha_fin": "25-06-2014"
		    }
		}]
	};

	// Layer GeoJSON.
	var geojsonLayer = L.geoJson(geojsonFeature, {});

	// Cluster de marcadores.
	var cluster_marcadores = L.markerClusterGroup();   	// Se crea un cluster group.
	cluster_marcadores.addLayer(geojsonLayer);   		// Agrega el Layer GeoJSON al cluster group.
	mapa.addLayer(cluster_marcadores);           		// Agrega el cluster group al mapa.
}
