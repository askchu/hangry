if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
};

const config = process.env.YELP;


//  const url = "https://api.yelp.com/v3/businesses/search?" + ;

//     const getLocation = async () => {
//         try {
//             const res = await axios.get(url, options);
//         } catch (e) {
//             console.log(e);
//         }

const yelp = require('yelp-fusion');
const client = yelp.client(config);

// client.search({
//     term: 'Four Barrel Coffee',
//     limit: 2,
//     location: 'san francisco, ca',
// }).then(response => {
//     for (let i = 0; i < response.jsonBody.businesses; i++) {
//         console.log(response.jsonBody.businesses);
//     }
//     console.log(response);
// }).catch(e => {
//     console.log(e);
// });

const businessSearch = async () => {
    try {
        const res = await client.search({
            term: 'sikgaek',
            limit: 1,
            location: 'mississauga, toronto',
        });
        console.log(res.jsonBody.businesses);

    } catch (e) {
        console.log(e);
    }
}

businessSearch();

