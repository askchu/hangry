if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
};

// const config = process.env.YELP;
// const yelp = require('yelp-fusion');
// const client = yelp.client(config);


// const businessSearch = async () => {
//     try {
//         const res = await client.search({
//             term: 'sikgaek',
//             limit: 1,
//             location: 'mississauga, toronto',
//         });
//         console.log(res.jsonBody.businesses);

//     } catch (e) {
//         console.log(e);
//     }
// }

// businessSearch();



// EVENT SEARCH

// const eventSearch = async () => {
//     try {
//         const res = await client.featuredEvent({
//             location: 'Toronto',
//             is_free: true,
//             // categories: 3
//         });
//         console.log(res.jsonBody);
//         // console.log(res.jsonBody.events.length);
//         // console.log(res.jsonBody.events[0].location);


//     } catch (e) {
//         console.log(e);
//     }
// }

// eventSearch();



// GET LAT AND LONG OF ADDRESS

// const axios = require('axios');

// const config = process.env.MAPQUEST;
// const location = "31 Romfield Circuit, Thornhill, Ontario, L3T 3H4"

// const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${config}&inFormat=kvp&outFormat=json&location=${location}&maxResults=1`;

// const getAddress = async () => {
//     try {
//         const res = await axios.get(url);
//         console.log(res.data.results[0].locations);
//         console.log(res.data.results[0].locations[0].displayLatLng.lng);
//     }
//     catch (e) {
//         console.log(e);
//     }
// };

// getAddress();

const user = {
    name: "Alex",
    long: 82,
    lat: 22
};

const featured = [];

const test = () => {
    for (let i = 0; i < 5; i++) {
        featured.push({
            'type': 'Feature',
            'properties': {
                'description':
                    `<h5>${user.name}</h5>`
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [user.long, user.lat]
            }
        }
        )

        // console.log(featured);
        return featured
    }
}

const x = test();
console.log(x);