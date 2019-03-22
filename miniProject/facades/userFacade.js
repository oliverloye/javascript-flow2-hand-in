const User = require('../models/user');


async function addUser(username, password, firstName = 'undefined', lastName = "undefined", email, created = undefined) {
    var user = new User({
        username: [username],
        password: [password],
        firstName: [firstName],
        lastName: [lastName],
        email: [email],
        created
    });
    return user;
    await user.save();
}


async function getAllUsers() {
    return await User.find({});
}

async function findByUsername(username) {
    return await User.find({
        "username": username
    });
}

module.exports = {addUser, getAllUsers, findByUsername};