const { default: Axios } = require('axios');
const fetch = require('node-fetch');
const zomato = require('zomato-api');
const config = "06d0a2ea8f9f03d774f9feffb42193ee"
const axios = require('axios');

const url = "https://developers.zomato.com/api/v2.1/locations?query=Mississauga"

const options = {
    headers: {
        "user-key": config
    }
};

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
//1st way
// fetch(url, options)
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));

// 2nd way
// const results = async function getLocation() {
//     const location = await fetch(
//         url, options
//     );
//     const response = await location.json();
//     title = response.location_suggestions[0].title;
//     console.log(response);
//     console.log(response.location_suggestions[0].title);
// }();
// console.log(results);

//3rd way
// (async () => {
//     const results = await fetch(
//         url, options
//     )
//         .then((response) => response.json())
//         .then((data) => {
//             const title = data.location_suggestions[0].title;
//             console.log(data);
//             console.log(`Location is at ${title}`);
//         })
//         .catch((err) => (console.log(err)));
// })();


// 4th way
const getLocation = async () => {
    try {
        const res = await axios.get(url, options);
        // console.log(res) //show directory
        console.log(res.data);
        console.log(res.data.location_suggestions[0].title);
        return res.data.location_suggestions[0].title;
    } catch (e) {
        console.log(e);
    }
};

getLocation();

