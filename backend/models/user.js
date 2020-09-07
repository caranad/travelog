const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        username: String,
        firstname: String,
        lastname: String,
        joined_date: Date,
        password: String
    },
    {
        collection: "Users"
    }
)

module.exports = {
    User: mongoose.model('Users', User)
}