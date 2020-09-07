const mongoose = require('mongoose');

const Reviews = new mongoose.Schema(
    {
        username: String,
        location: String,
        content: String,
        rating: Number
    },
    {
        collection: "Reviews"
    }
)

module.exports = {
    Reviews: mongoose.model('Reviews', Reviews)
}