const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HangrySchema = new Schema({
    data: {
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
        cuisine: [
            {
                cuisine_id: Number,
                cuisine_name: String
            }
        ]
    }
});

module.exports = mongoose.model('Hangry', HangrySchema);
