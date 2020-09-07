const mongoose = require('mongoose');
const User = require('../models/user').User;

class UserController {
    constructor() { }

    async validateUser(username, password) {
        const users = await User.find({ username, password });
        return !!(users && users[0]);
    }
}

module.exports = {
    UserController
}