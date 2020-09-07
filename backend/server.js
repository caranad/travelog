const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const ReviewController = require('./controllers/reviewController').ReviewController;
const UserController = require('./controllers/userController').UserController;

const rc = new ReviewController();
const uc = new UserController();

const app = express();
mongoose.connect("mongodb://localhost:27017/travelogue").then(() => {
    console.log("Successfully created travelogue");
});

const options = {
    origin: ['http://localhost:3000'],
    methods: ['GET','POST', 'PUT', 'DELETE'],
    credentials: true
};

app.use(bodyparser.json());
app.use(cors(options));

app.post('/api/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const isValid = await uc.validateUser(username, password);
    res.json({
        isValid, username
    })
})

app.get('/api/reviews', (req, res) => {
    const filter = req.query ? req.query : {};

    rc.getReviews(filter).then((reviews) => {
        res.json({
            reviews
        });
    })
})

app.delete('/api/reviews/:id', (req, res) => {
    rc.deleteReview(req.params.id).then(() => {
        res.json({
            success: true
        });
    })
})

app.post('/api/reviews', (req, res) => {
    rc.addReview(req.body.review).then(() => {
        res.json({
            success: true
        });
    })
})

app.listen(3001, () => {
    console.log("Server started at https://localhost:3001");
})