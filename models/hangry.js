const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HangrySchema = new Schema({
    data: {
        title: String,
        latitude: Number,
        longitude: Number,
        entity_id: Number,
        entity_type: String,
        city_id: Number,
        city_name: String,
    }
});

module.exports = mongoose.model('Hangry', HangrySchema);
