//const User = require('../models/user');
const position = require('../models/position');
const User = require('../models/user');
const userFacade = require('./userFacade');
const positionFacade = require('./positionFacade');

async function userLogin(username,password,longitude,latitude,radius) {
    //const user = await userFacade.findByUsername(username);
    const user = await User.findOne({ username }).exec();
    const errorMsg = {msg: "wrong username or password", status: 403}; //(StatusCode = 403);

    if( !(isEmpty(user)) && user.password === password ) {
        console.log("User found!");
        console.log("password matches!");
        console.log(user);
        console.log(user._id);

        const coordinates = [longitude, latitude];
        return await position.findOneAndUpdate(
            { user: user._id },
            { user, created: Date.now(), loc: { type: 'Point', coordinates } },
            { upsert: true, new: true }
        ).exec();

    } else {
        return errorMsg;
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
    userLogin: userLogin,
    isEmpty: isEmpty
};