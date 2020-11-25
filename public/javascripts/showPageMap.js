
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v11', // stylesheet location
    center: [results.longitude, results.latitude], // starting position [lng, lat]
    zoom: 12 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());


new mapboxgl.Marker()
    .setLngLat([results.longitude, results.latitude])
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${results.name}</h3><p>${results.locality}</p>`
            )
    )
    .addTo(map)
