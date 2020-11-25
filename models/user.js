const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
     email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
     }
     
});

UserSchema.plugin(passportLocalMongoose);
// this adds on to our schema a username, and a field for password, and make sure those usernames are unique and not duplicated.

module.exports = mongoose.model("User", UserSchema);