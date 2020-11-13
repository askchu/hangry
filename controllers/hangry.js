const Hangry = require('../models/hangry');
const config = process.env.ZOMATO
const fetch = require('node-fetch');
const zomato = require('zomato-api');
const axios = require('axios');


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
    const hangry = req.body;
    const location = hangry.location;
    const url = "https://developers.zomato.com/api/v2.1/locations?query=" + location;
    const getLocation = async () => {
        try {
            const res = await axios.get(url, options);
            // console.log(res) //show directory
            // console.log(res.data.location_suggestions[0]);
            const results = new Hangry({
                data: {
                    entity_type: res.data.location_suggestions[0].entity_type,
                    entity_id: res.data.location_suggestions[0].entity_id,
                    title: res.data.location_suggestions[0].title,
                    latitude: res.data.location_suggestions[0].latitude,
                    longitude: res.data.location_suggestions[0].longitude,
                    city_id: res.data.location_suggestions[0].city_id,
                    city_name: res.data.location_suggestions[0].city_name
                }
            })
            await results.save();
            console.log("Saved to DB");
        } catch (e) {
            console.log(e);
        }
    };
    getLocation();
    res.redirect('/hangry');
}

module.exports.results = async (req, res) => {
    res.render('hangry/results');
}