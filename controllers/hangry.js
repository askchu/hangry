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

    // prints out every location alphabetically

    // for (let i = 0; i < hangryz.length; i++) {
    //     console.log(hangryz[i].title);
    // }

    // If back to home page, and there is data saved in restaurant in any of the locations, delete it.
    for (let hangry of hangryz) {
        const id = hangry._id;
        if (hangry.restaurant.length) {
            await Hangry.updateOne({ _id: id }, { $pull: { restaurant: { name: { $exists: true } } } }, { new: true }
                // ,
                // function (err, res) {
                //     if (err) {
                //         console.log(err);
                //     } else {
                //         console.log(res);
                //     }
                // }
            );
        }
    }



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


    // Removes filter search request if there is one already made
    if (hangry.search.length) {
        const idTwo = hangry.search[0]._id
        const remove = await Hangry.updateOne({ _id: id }, { $pull: { search: { _id: idTwo } } }, { new: true }
            // ,
            // function (err, res) {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         console.log(res);
            //     }
            // }
        );
    };

    // Adds a new filter search request
    const add = await Hangry.findByIdAndUpdate(id, { $addToSet: { search: [{ cuisine_id: results.cuisineId, establishment_id: results.establishmentId, count: results.count }] } }, { new: true });
    console.log(`You searched for ${add.search[0].count} restaurants`);

    // If there is data saved in restaurant, delete it.
    if (hangry.restaurant.length) {
        await Hangry.updateOne({ _id: id }, { $pull: { restaurant: { name: { $exists: true } } } }, { new: true }
            // ,
            // function (err, res) {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         console.log(res);
            //     }
            // }
        );
    }

    // Searches for restaurant
    const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${hangry.entity_id}&entity_type=${hangry.entity_type}&count=${add.search[0].count}&cuisines=${add.search[0].cuisine_id}&establishment_type=${add.search[0].establishment_id}`;

    // console.log(url);

    const search = async () => {
        try {
            const searchResults = await axios.get(url, options);

            const res = searchResults.data.restaurants;

            // Prints the restaurant names
            if (res.length < 1) {
                console.log("No results found, filter again")
            }
            // for (let i = 0; i < res.length; i++) {
            //     console.log(res[i].restaurant.name);
            // }

            const saved = res.length;

            // console.log(res[0]);

            // Adds search results onto restaurant array

            for (let i = 0; i < res.length; i++) {
                const add = await Hangry.findByIdAndUpdate(id, {
                    $addToSet: {
                        restaurant: [{
                            res_id: res[i].restaurant.R.res_id,
                            name: res[i].restaurant.name,
                            locality: res[i].restaurant.location.locality,
                            averageRating: res[i].restaurant.user_rating.aggregate_rating,
                            thumbnail: res[i].restaurant.thumb,
                            cuisineType: res[i].restaurant.cuisines,
                            averageCostForTwo: res[i].restaurant.average_cost_for_two,
                            timings: res[i].restaurant.timings,
                            phoneNumber: res[i].restaurant.phone_numbers
                        }]
                    }
                }, { new: true });
            }
            // console.log(res.length);
            // console.log(hangry.search[0].count);
            if (hangry.search[0].count < res.length) {
                console.log(`Found ${res.length} restaurants`)
            }
            return saved
        } catch (e) {
            console.log(e);
        }
    };
    const length = await search();

    // If no results, redirect back to the same page, else go show list of restaurants

    // if (length > 0) {
    //     res.redirect(`/hangry/${hangry._id}/search`)
    // } else {
    //     res.render('hangry/show', { hangry });
    // }

    res.redirect(`/hangry/${hangry._id}/search`)

};

module.exports.searchResults = async (req, res) => {
    const hangry = await Hangry.findById(req.params.id);
    // console.log(hangry.search.entity_id);
    const id = hangry._id;
    // console.log(id);


    const hangryz = await Hangry.aggregate([
        { $unwind: "$restaurant" },
        { $sort: { "restaurant.name": 1 } }
    ])


    // Resets search count back to 0, incase user adds a new filter.
    await Hangry.findByIdAndUpdate(id, { search: [{ count: 0 }] }, { new: true });

    // Prints out restaurants name alphabetically

    if (hangry.restaurant.length > 0) {
        console.log("Results....");
        for (let i = 0; i < hangryz.length; i++) {
            console.log(i + " - " + hangryz[i].restaurant.name);
            // console.log(hangryz[i].restaurant.res_id);
            // console.log(hangryz[i].restaurant.averageCostForTwo);
            // console.log(hangryz[i].restaurant.cuisineType);
        }
    }

    res.render(`hangry/search`, { hangry, hangryz })
};
