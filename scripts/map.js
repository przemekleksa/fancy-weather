mapboxgl.accessToken = 'pk.eyJ1IjoiZ25vb3NueSIsImEiOiJja2F6cDJxOW8wMDl0MzVudmV0ZGF2eHE3In0.flaXdNtHW6qEA24YLZyTZA';
		var map_ = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
		center: [19.98, 50.02], // starting position [lng, lat]
		zoom: 11 // starting zoom
		});

map.on('load', function () {
	map.resize();
});