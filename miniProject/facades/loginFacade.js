//const User = require('../models/user');
const position = require('../models/position');
const userFacade = require('./userFacade');
const positionFacade = require('./positionFacade');

async function userLogin(username,password,longitude,latitude,radius) {
    var user = await userFacade.findByUsername(username);
    var msg = {msg: "wrong username or password", status: 403}; //(StatusCode = 403);
    if(!(isEmpty(user))) {
        console.log("User found!");
        console.log(user);
        if(user[0].password === password) {
            console.log("password matches!");
            console.log(user[0]._id);
            // await position.findOneAndUpdate(
            //     {"user" : user[0]._id},
            //     {$set: {"coordinates.$" : [longitude,latitude]}}
            //);

        } else {
            console.log("password does not match!");
            return msg;
        }
    } else {
        console.log("User not found!");
        return msg;
    }

    return user;

}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports = {
    userLogin: userLogin
};