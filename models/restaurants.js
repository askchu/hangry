const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    // need work
});

module.exports = mongoose.model("Restaurant", restaurantSchema);