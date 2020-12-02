
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v11', // stylesheet location
    center: [user.address.coordinates.long, user.address.coordinates.lat], // starting position [lng, lat]
    zoom: 10 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());



// POPUP ON HOVER

// new mapboxgl.Marker()
//     .setLngLat([user.address.coordinates.long, user.address.coordinates.lat])
//     .setPopup(
//         new mapboxgl.Popup({ offset: 1 })
//             .setHTML(
//                 `<strong>General house location of ${user.username}</strong><p>${user.address.city}, ${user.address.state}</p>`
//             )
//     )
//     .addTo(map)

// map.on('load', function () {
//     map.loadImage(
//         'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
//         // Add an image to use as a custom marker
//         function (error, image) {
//             if (error) throw error;
//             map.addImage('custom-marker', image);


//             map.addSource('places', {
//                 'type': 'geojson',
//                 data

//             });

//             // Add a layer showing the places.
//             map.addLayer({
//                 'id': 'places',
//                 'type': 'symbol',
//                 'source': 'places',
//                 'layout': {
//                     'icon-image': 'custom-marker',
//                     'icon-allow-overlap': true
//                 }
//             });
//         }
//     );

//     // Create a popup, but don't add it to the map yet.
//     var popup = new mapboxgl.Popup({
//         closeButton: false,
//         closeOnClick: false
//     });

//     map.on('mouseenter', 'places', function (e) {
//         // Change the cursor style as a UI indicator.
//         map.getCanvas().style.cursor = 'pointer';

//         var coordinates = e.features[0].geometry.coordinates.slice();
//         var description = e.features[0].properties.description;

//         // Ensure that if the map is zoomed out such that multiple
//         // copies of the feature are visible, the popup appears
//         // over the copy being pointed to.
//         while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//             coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//         }

//         // Populate the popup and set its coordinates
//         // based on the feature found.
//         popup.setLngLat(coordinates).setHTML(description).addTo(map);
//     });

//     map.on('mouseleave', 'places', function () {
//         map.getCanvas().style.cursor = '';
//         popup.remove();
//     });
// });


// POP UP ON CLICK
for (let i = 0; i < user.restaurantSearch.length; i++) {
    new mapboxgl.Marker()
        .setLngLat([user.restaurantSearch[i].coordinates.longitude, user.restaurantSearch[i].coordinates.latitude])
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setHTML(
                    `<strong>${ user.restaurantSearch[i].name }</strong >`
                )
        )
        .addTo(map)
}

// ANIMATED DOT ON HOUSE
var size = 200;
 
// implementation of CustomLayerInterface to draw a pulsing dot icon on the map
// see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
var pulsingDot = {
width: size,
height: size,
data: new Uint8Array(size * size * 4),
 
// get rendering context for the map canvas when layer is added to the map
onAdd: function () {
var canvas = document.createElement('canvas');
canvas.width = this.width;
canvas.height = this.height;
this.context = canvas.getContext('2d');
},
 
// called once before every frame where the icon will be used
render: function () {
var duration = 1000;
var t = (performance.now() % duration) / duration;
 
var radius = (size / 2) * 0.3;
var outerRadius = (size / 2) * 0.7 * t + radius;
var context = this.context;
 
// draw outer circle
context.clearRect(0, 0, this.width, this.height);
context.beginPath();
context.arc(
this.width / 2,
this.height / 2,
outerRadius,
0,
Math.PI * 2
);
context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
context.fill();
 
// draw inner circle
context.beginPath();
context.arc(
this.width / 2,
this.height / 2,
radius,
0,
Math.PI * 2
);
context.fillStyle = 'rgba(255, 100, 100, 1)';
context.strokeStyle = 'white';
context.lineWidth = 2 + 4 * (1 - t);
context.fill();
context.stroke();
 
// update this image's data with data from the canvas
this.data = context.getImageData(
0,
0,
this.width,
this.height
).data;
 
// continuously repaint the map, resulting in the smooth animation of the dot
map.triggerRepaint();
 
// return `true` to let the map know that the image was updated
return true;
}
};
 
map.on('load', function () {
map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
 
map.addSource('points', {
'type': 'geojson',
'data': {
'type': 'FeatureCollection',
'features': [
{
'type': 'Feature',
'geometry': {
'type': 'Point',
'coordinates': [user.address.coordinates.long, user.address.coordinates.lat]
}
}
]
}
});
map.addLayer({
'id': 'points',
'type': 'symbol',
'source': 'points',
'layout': {
'icon-image': 'pulsing-dot'
}
});
});