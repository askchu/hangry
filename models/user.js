const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        postalCode: String,
        maxResults: Number,
        coordinates: {
            lat: Number,
            long: Number
        }
    },
    favorites: [{
        res_id: String,
        name: String,
        url: String,
        rating: Number,
        coordinates: {
            latitude: Number,
            longitude: Number
        },
        image_url: String,
        price: String,
        city: String,
        zip_code: String,
        country: String,
        state: String,
        address: String,
        address1: String,
        address2: String,
        locality: String,
        cuisineType: String,
        averageCostForTwo: Number,
        timings: String,
        currency: String,
        highlights: [String],
        averageRating: String,
        ratingVotes: Number,
        menu: String,
        phoneNumber: String,
        thumbnail: String,
        featured_image: String,
        longitude: String,
        latitude: String,
    }],
    chosenRestaurant: {
        res_id: Number,
        name: String,
         url: String,
        rating: Number,
        coordinates: {
            latitude: Number,
            longitude: Number
        },
        image_url: String,
        price: String,
        city: String,
        zip_code: String,
        country: String,
        state: String,
        address: String,
        address1: String,
        address2: String,
        locality: String,
        cuisineType: String,
        averageCostForTwo: Number,
        timings: String,
        currency: String,
        highlights: [String],
        averageRating: String,
        ratingVotes: Number,
        menu: String,
        phoneNumber: String,
        thumbnail: String,
        featured_image: String,
        longitude: String,
        latitude: String,
    },
    trending: [{
        collection_id: Number,
        res_count: Number,
        image_url: String,
        url: String,
        title: String,
        description: String,
        share_url: String
    }],
    term: String,
    location: String,
    restaurantSearch: [{
        name: String,
        image_url: String,
        url: String,
        rating: Number,
        coordinates: {
            latitude: Number,
            longitude: Number
        },
        price: String,
        address1: String,
        address2: String,
        city: String,
        zip_code: String,
        country: String,
        state: String,
        display_address: String,
        display_phone: String,
        geometry: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        },
    }],

});

UserSchema.plugin(passportLocalMongoose);
// this adds on to our schema a username, and a field for password, and make sure those usernames are unique and not duplicated.

module.exports = mongoose.model("User", UserSchema);