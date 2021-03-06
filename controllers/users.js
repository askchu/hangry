const User = require('../models/user');
const config = process.env.ZOMATO
const axios = require('axios');



// ZOMATO API
const options = {
    headers: {
        "user-key": config
    }
};

module.exports.profile = async (req, res) => {
    const user = await User.findById(req.user.id);
    const location = `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.postalCode}`;
    // console.log(location);
    // console.log(user);
    res.render('users/profile', { user });
}

module.exports.editResults = async (req, res) => {
    const user = await User.findById(req.user.id);

    console.log(req.body);
    const result = req.body;

    const update = await User.findByIdAndUpdate(user, {
        address: {
            street: result.street,
            city: result.city,
            state: result.state,
            postalCode: result.postalCode,
            country: result.country,
            maxResults: 1
        }
    }, { new: true });

    console.log(update);


    req.flash('success', "Changes updated.")
    res.redirect('/profile');
}

module.exports.editProfile = async (req, res) => {
    const user = await User.findById(req.user.id);

    res.render('users/editProfile', { user });
}

module.exports.register = (req, res) => {
    res.render('users/register');
};

module.exports.registerPost = async (req, res, next) => {
    

    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        const id = user._id;
        const result = req.body;

        const config2 = process.env.MAPQUEST;
        const location = `${result.address}, ${result.city}, ${result.state}, ${result.postalCode}`;


        const url3 = `https://www.mapquestapi.com/geocoding/v1/address?key=${config2}&inFormat=kvp&outFormat=json&location=${location}&maxResults=1`;
        const getAddress = async () => {
            try {
                const res = await axios.get(url3);
                // console.log(res.data.results[0].locations);

                await User.findByIdAndUpdate(id, {
                    address:
                    {
                        street: result.address,
                        city: result.city,
                        state: result.state,
                        country: result.country,
                        postalCode: result.postalCode,
                        maxResults: 1,
                        coordinates: {
                            lat: res.data.results[0].locations[0].latLng.lat,
                            long: res.data.results[0].locations[0].latLng.lng
                        }
                    }
                }, { new: true })
            }
            catch (e) {
                console.log(e);
            }
        };
        getAddress();



        // Collect the trend for default City: Toronto
        const url = "https://developers.zomato.com/api/v2.1/collections?city_id=89&count=5";

        const trend = await axios.get(url, options);
        // console.log(trend)
        // console.log(trend.data.collections[0].collection.title)
        const length = trend.data.collections.length;
        for (let i = 0; i < length; i++) {
            await User.findByIdAndUpdate(id, {
                $addToSet:
                {
                    trending:
                        [{
                            collection_id: trend.data.collections[i].collection.collection_id,
                            res_count: trend.data.collections[i].collection.res_count,
                            image_url: trend.data.collections[i].collection.image_url,
                            title: trend.data.collections[i].collection.title,
                            description: trend.data.collections[i].collection.description,
                            share_url: trend.data.collections[i].collection.share_url
                        }]
                }
            }, { new: true })
        }
        // console.log(res.data.location_suggestions[0]);


        // console.log(results);
        // await results.save();




        req.login(registeredUser, err => {
            // After registering, you are immediately logged in. 
            if (err) {
                console.log(err);
            } else {
                req.flash('success', 'Welcome to Hangry');
                res.redirect('/hangry');
            }
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
};

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
};

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = req.session.returnTo || '/hangry';
    delete req.session.returnTo;
    // takes you back to the original page you were before login page popped up
    // deletes the session value of "returnTo"
    res.redirect(redirectUrl);
};

module.exports.favoritePage = async (req, res) => {
    const user = await User.findById(req.user.id);
    // console.log(user);

    const form = user.favorites;
    const length = form.length;

    // const x = Array.isArray(form);


    res.render('users/favorites', { user, length });
}

module.exports.generateFavorite = async (req, res) => {
    const user = await User.findById(req.user.id);
    // console.log(user);

    const length = user.favorites.length;

    // Generate random number between all the restaurants
    const randRestNum = Math.floor(Math.random() * length);
    // console.log(randRestNum);

    const restaurant = user.favorites;
    // console.log(restaurant[randRestNum].name);

    const finalResult = await User.findByIdAndUpdate(user, {
        chosenRestaurant:
        {
            // res_id: restaurant[randRestNum].res_id,
            name: restaurant[randRestNum].name,
            address: restaurant[randRestNum].address,
            url: restaurant[randRestNum].url,
            locality: restaurant[randRestNum].locality,
            cuisineType: restaurant[randRestNum].cuisineType,
            averageCostForTwo: restaurant[randRestNum].averageCostForTwo,
            timings: restaurant[randRestNum].timings,
            currency: restaurant[randRestNum].currency,
            highlights: restaurant[randRestNum].highlights,
            averageRating: restaurant[randRestNum].averageRating,
            ratingVotes: restaurant[randRestNum].ratingVotes,
            menu: restaurant[randRestNum].menu,
            phoneNumber: restaurant[randRestNum].phoneNumber,
            thumbnail: restaurant[randRestNum].thumbnail,
            featured_image: restaurant[randRestNum].featured_image,
            longitude: restaurant[randRestNum].longitude,
            latitude: restaurant[randRestNum].latitude,
        }
    }, { new: true });
    // console.log(finalResult)

    res.redirect('/favorites/results');
}

module.exports.deleteFavorite = async (req, res) => {
    const user = await User.findById(req.user.id);
    // console.log(user);
    // console.log(req.body);
    res.render('users/deleteFavorites', { user })
}

module.exports.deleteFavoritePost = async (req, res) => {
    const user = await User.findById(req.user.id);
    const result = req.body
    const id = result.id;
    console.log(id);

    // Removes the restaurant selected
    const x = await User.updateOne({ _id: user }, { $pull: { favorites: { _id: id } } }, { new: true });
    console.log(x);

    res.redirect('/deleteFavorites');
}

module.exports.results = async (req, res) => {
    const user = await User.findById(req.user.id);

    res.render('users/results', { user })
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', "See you next time!");
    res.redirect('/hangry');
};