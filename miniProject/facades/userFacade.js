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
    await user.save();
    return user;
}


async function getAllUsers() {
    return await User.find({});
}

async function findByUsername(username) {
    return await User.find({
        "username": username
    });
}

async function deleteAllUsers() {
    return await User.deleteMany();
}

async function deleteUser(username) {
    return await User.deleteOne({
        "username": username
    });
}

module.exports = {
    addUser: addUser,
    getAllUsers: getAllUsers,
    findByUsername: findByUsername,
    deleteAllUsers: deleteAllUsers,
    deleteUser: deleteUser
};