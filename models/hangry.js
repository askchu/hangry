const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HangrySchema = new Schema({
    title: {
        type: String,
        // unique: true
    },
    latitude: Number,
    longitude: Number,
    entity_id: Number,
    entity_type: String,
    city_id: Number,
    city_name: String,
    cuisine: [{
        cuisine_name: String,
        cuisine_id: Number
    }]
});

module.exports = mongoose.model('Hangry', HangrySchema);
