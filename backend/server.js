const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: "./backend/uploads/",
    filename: function(req, file, cb){
        cb(null,"IMAGE-" + Date.now() + file.originalname);
    }
});
const upload = multer({ storage })
const cors = require('cors');

const ReviewController = require('./controllers/reviewController').ReviewController;
const UserController = require('./controllers/userController').UserController;

const rc = new ReviewController();
const uc = new UserController();

const app = express();
mongoose.connect("mongodb://localhost:27017/travelogue").then(() => {
    console.log("Successfully created travelogue");
});

const options = require('./cors.json');

app.use(bodyparser.json());
app.use(cors(options));

app.post('/api/upload', (req, res) => {
    const file = upload.single('avatar');
    file(req, res, (err) => {
        uc.uploadImage(req.body.username, `http://localhost:3001/api/upload/${req.file.filename}`).then(() => {
            res.json({ success: true, img_url: req.file.filename });
        })
     });
})

app.get("/api/upload/:img", (req, res) => {
    res.sendFile(__dirname + "/uploads/" + req.params.img);
});

app.post('/api/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const isValid = await uc.validateUser(username, password);
    res.json({
        isValid, username
    })
})

app.get('/api/users/:username', (req, res) => {
    uc.getUser(req.params.username).then((user) => {
        if (user && user.length > 0) {
            res.json({
                user: user[0]
            })
        }
    })
})

app.post('/api/users', (req, res) => {
    const data = { ...req.body, joined_date: new Date(), img_url: '' }

    uc.addUser(req.body).then((user) => {
        res.json({
            success: true
        })
    })
})

app.patch('/api/users/:username', (req, res) => {
    uc.updateUser(req.params.username, req.body).then(() => {
        res.json({
            success: true
        })
    })
})

app.delete('/api/users/:username', (req, res) => {
    uc.deleteUser(req.params.username).then(() => {
        rc.deleteReviewsByUser(req.params.username).then(() => {
            res.json({
                success: true
            })
        })
    })
});

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