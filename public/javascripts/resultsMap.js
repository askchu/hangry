
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v11', // stylesheet location
    center: [user.chosenRestaurant.longitude, user.chosenRestaurant.latitude], // starting position [lng, lat]
    zoom: 12 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());


new mapboxgl.Marker()
    .setLngLat([user.chosenRestaurant.longitude, user.chosenRestaurant.latitude])
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${user.chosenRestaurant.name}</h3><p>${user.chosenRestaurant.locality}</p>`
            )
    )
    .addTo(map)
