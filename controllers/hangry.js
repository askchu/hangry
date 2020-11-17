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
    const hangries = req.body;
    const location = hangries.location;
    const url = "https://developers.zomato.com/api/v2.1/locations?query=" + location;

    const getStuff = async () => {
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
                    city_name: res.data.location_suggestions[0].city_name,
                }
            })

            console.log(results);
            await results.save();


        } catch (e) {
            console.log(e);
        }
    };
    getStuff();
    res.redirect(`/hangry`);
};

module.exports.showSearch = async (req, res) => {
    const { id } = req.params;
    const hangry = await Hangry.findById(id);
    res.render('hangry/show', { hangry });
}

module.exports.results = async (req, res) => {
    res.render('hangry/results');
};