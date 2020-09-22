const mongoose = require('mongoose');
const User = require('../models/user').User;

class UserController {
    constructor() { }

    async validateUser(username, password) {
        const users = await User.find({ username, password });
        
        if (users && users[0]) {
            return {
                isValid: true,
                user: JSON.stringify(users[0])
            }
        } else {
            return {
                isValid: false,
                users: null
            }
        }
    }

    addUser(user) {
        return User.insertMany([user]);
    }

    getUser(username) {
        return User.find({ username });
    }

    updateUser(username, data) {
        return User.updateMany({ username }, data)
    }

    deleteUser(username) {
        return User.deleteMany({ username });
    }

    uploadImage(username, img_url) {
        return User.updateMany({ username }, { img_url })
    }
}

module.exports = {
    UserController
}