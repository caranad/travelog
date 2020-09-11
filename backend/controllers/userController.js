const mongoose = require('mongoose');
const User = require('../models/user').User;

class UserController {
    constructor() { }

    async validateUser(username, password) {
        const users = await User.find({ username, password });
        return !!(users && users[0]);
    }

    getUser(username) {
        return User.find({ username });
    }

    updateUser(username, data) {
        return User.updateMany({ username }, data)
    }
}

module.exports = {
    UserController
}