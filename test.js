if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
};

const config = process.env.YELP;
const yelp = require('yelp-fusion');
const client = yelp.client(config);


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


const eventSearch = async () => {
    try {
        const res = await client.featuredEvent({
            location: 'L5V 2E8',
            is_free: true,
            // categories: 3
        });
        console.log(res.jsonBody);
        // console.log(res.jsonBody.events.length);
        // console.log(res.jsonBody.events[0].location);


    } catch (e) {
        console.log(e);
    }
}

eventSearch();
