export const drawMap = (lat, lon) => {
	mapboxgl.accessToken = 'pk.eyJ1IjoiZ25vb3NueSIsImEiOiJja2F6cDJxOW8wMDl0MzVudmV0ZGF2eHE3In0.flaXdNtHW6qEA24YLZyTZA';
	var map_ = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
	center: [lon, lat], // starting position [lng, lat]
	zoom: 11 // starting zoom
	});
	// console.log(lat, lon)

	// map.on('load', function () {
	// map.resize();
	// });
}

// drawMap()