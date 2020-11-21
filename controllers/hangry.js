const Hangry = require('../models/hangry');
const config = process.env.ZOMATO
const axios = require('axios');



const options = {
    headers: {
        "user-key": config
    }
};


module.exports.index = async (req, res) => {


    //   Lists every location alphabetically
    const hangryz = await Hangry.find().collation({ locale: 'en', strength: 2 }).sort({ title: 1 });
    // for (let i = 0; i < hangryz.length; i++) {
    // prints out every location alphabetically
    //     console.log(hangryz[i].title);
    // }
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

            const saved = {
                id: results._id,
                cityId: results.city_id
            };

            const id = saved.id;
            const cityId = saved.cityId;

            // RUN GET CUISINE OF CITY API
            const urlTwo = "https://developers.zomato.com/api/v2.1/cuisines?city_id=" + cityId;

            const getCuisine = async () => {
                try {
                    const cuisines = await axios.get(urlTwo, options);
                    // console.log(cuisines.data.cuisines);
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
            };

            const urlThree = "https://developers.zomato.com/api/v2.1/establishments?city_id=" + cityId;

            const getEstablishment = async () => {
                try {
                    const est = await axios.get(urlThree, options);
                    // console.log(est.data.establishments);
                    const k = est.data.establishments;
                    for (let i = 0; i < k.length; i++) {
                        // Prints out every establishment name
                        // console.log(k[i].establishment.name)
                        const res = await Hangry.findByIdAndUpdate(id, { $addToSet: { establishment: [{ establishment_name: k[i].establishment.name, establishment_id: k[i].establishment.id }] } }, { new: true });
                        // ,
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
            };




            getEstablishment();
            getCuisine();
            return saved;
        } catch (e) {
            console.log(e);
        }
    };
    const saved = await getLocation();
    const id = saved.id;
    console.log("New Location: '" + id + "' saved to Database")

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
    // const cuisine = hangries.cuisine_id;
    // console.log(cuisine);
    // const establishment = hangries.id
    // console.log(establishment);
    const results = {
        cuisineId: hangries.cuisine_id,
        establishmentId: hangries.establishment_id,
        count: hangries.count
    }
    const id = hangry._id
    const add = await Hangry.findByIdAndUpdate(id, { $addToSet: { search: { cuisine_id: results.cuisineId, establishment_id: results.establishmentId, count: results.count } } }, { new: true });
    console.log(add.search);
    // console.log("Cuisine Id:" + results.cuisineId);
    // console.log("Establishment Id: " + results.establishmentId);
    // console.log("Entity Id: " + results.entityId);
    // console.log("Entity Type: " + results.entityType);


    // res.redirect(`/hangry/${hangry._id}`)
    res.redirect(`/hangry/${hangry._id}/search`)
}

module.exports.searchResults = async (req, res) => {
    const hangry = await Hangry.findById(req.params.id);
    // console.log(hangry.search.entity_id);


    // WORK IN PROGRESS

    const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${hangry.entity_id}&entity_type=${hangry.entity_type}&count=${hangry.search.count}&cuisines=${hangry.search.cuisine_id}&establishment_type=${hangry.search.establishment_id}`;

    const search = async () => {
        try {
            const searchResults = await axios.get(url, options);
            console.log(searchResults.data.restaurants[0].restaurant);
            // Prints out the first restaurant details searched
            console.log(searchResults.data.restaurants[0].restaurant.name);
            // console.log(searchResults.data.restaurants[0].restaurant.location.city);
            // console.log(searchResults.data.restaurants[0].restaurant.location.address);
            console.log(searchResults.data.restaurants[0].restaurant.user_rating.aggregate_rating);



        } catch (e) {
            console.log(e);
        }
    };
    search();

    res.render(`hangry/search`, { hangry })
};

