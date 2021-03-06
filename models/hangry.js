const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HangrySchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    latitude: Number,
    longitude: Number,
    entity_id: Number,
    entity_type: String,
    city_id: Number,
    city_name: String,
    featured_image: String,
    cuisine: [{
        cuisine_name: String,
        cuisine_id: Number
    }],
    establishment: [{
        establishment_name: String,
        establishment_id: Number
    }],
    search: [{
        count: Number,
        cuisine_id: Number,
        establishment_id: Number
    }],
    restaurant: [{
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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Hangry', HangrySchema);
