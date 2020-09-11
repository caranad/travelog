const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        username: String,
        firstname: String,
        lastname: String,
        joined_date: Date,
        password: String,
        location: String,
        img_url: String
    },
    {
        collection: "Users"
    }
)

module.exports = {
    User: mongoose.model('Users', User)
}