const mongoose = require('mongoose');
const Reviews = require('../models/review').Reviews;

class ReviewController {
    constructor() { }

    getReviews(filter) {
        return Reviews.find(filter);
    }

    addReview(review) {
        return Reviews.insertMany(review);
    }

    deleteReview(id) {
        return Reviews.deleteOne({ _id: id });
    }
}

module.exports = {
    ReviewController
}