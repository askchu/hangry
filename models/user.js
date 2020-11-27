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
    favorites: [{
        res_id: Number,
        name: String,
        address: String,
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
        address: String,
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
    }
});

UserSchema.plugin(passportLocalMongoose);
// this adds on to our schema a username, and a field for password, and make sure those usernames are unique and not duplicated.

module.exports = mongoose.model("User", UserSchema);