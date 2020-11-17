const Hangry = require('../models/hangry');
const config = process.env.ZOMATO
const fetch = require('node-fetch');
const zomato = require('zomato-api');
const axios = require('axios');
const hangry = require('../models/hangry');



const options = {
    headers: {
        "user-key": config
    }
};


module.exports.index = async (req, res) => {
    const hangryz = await Hangry.find();
    res.render('hangry/index', { hangryz });
};

module.exports.search = async (req, res) => {
    const hangries = req.body;
    const location = hangries.location;
    const url = "https://developers.zomato.com/api/v2.1/locations?query=" + location;

    const getLocation = async () => {
        try {
            const res = await axios.get(url, options);
            // console.log(res) //show directory
            // console.log(res.data.location_suggestions[0]);
            const results = new Hangry({
                entity_type: res.data.location_suggestions[0].entity_type,
                entity_id: res.data.location_suggestions[0].entity_id,
                title: res.data.location_suggestions[0].title,
                latitude: res.data.location_suggestions[0].latitude,
                longitude: res.data.location_suggestions[0].longitude,
                city_id: res.data.location_suggestions[0].city_id,
                city_name: res.data.location_suggestions[0].city_name,
            })
            console.log(results);

            await results.save();



            // RUN GET CUISINE OF CITY API

            const id = results._id;
            const cityId = results.city_id;
            const urlTwo = "https://developers.zomato.com/api/v2.1/cuisines?city_id=" + cityId;

            const getCuisine = async () => {
                try {
                    const cuisines = await axios.get(urlTwo, options);
                    for (food of cuisines.data.cuisines) {
                        // console.log(food.cuisine.cuisine_name);
                        // console.log(food.cuisine.cuisine_id);
                        const x = await Hangry.findByIdAndUpdate(id, { $addToSet: { cuisine: [{ cuisine_name: food.cuisine.cuisine_name, cuisine_id: food.cuisine.cuisine_id }] } }, { new: true })
                        // shows the updated lists
                        //     function (err, res) {
                        //         if (err) {
                        //             console.log(err);
                        //         } else {
                        //             console.log(res);
                        //         }
                        //     }
                        // );
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            getCuisine();
        } catch (e) {
            console.log(e);
        }
    };
    getLocation();
    res.redirect(`/hangry`);
};

module.exports.showLocation = async (req, res) => {
    const { id } = req.params;
    const hangry = await Hangry.findById(id);
    res.render('hangry/show', { hangry });
}

module.exports.cuisineSearch = async (req, res) => {
    const hangry = await Hangry.findById(req.params.id);
    const hangries = req.body;
    const cuisine = hangries.cuisine_id;
    console.log(cuisine);

    res.redirect(`/hangry/${hangry._id}`)
}


module.exports.results = async (req, res) => {
    res.render('hangry/results');
};