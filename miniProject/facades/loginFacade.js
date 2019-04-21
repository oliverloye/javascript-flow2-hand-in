//const User = require('../models/user');
const position = require('../models/position');
const User = require('../models/user');
const userFacade = require('./userFacade');
const positionFacade = require('./positionFacade');

async function userLogin(username, password, longitude, latitude, radius) {
    //const user = await userFacade.findByUsername(username); // Gav problemer da den returner et arrayObject.
    const user = await User.findOne({username}).exec();
    const errorMsg = {msg: "wrong username or password", status: 403}; //(StatusCode = 403);

    if (!(isEmpty(user)) && user.password === password) {  //Kunne også bare tjekke (user !== null)
        console.log("User found!");
        console.log("password matches!");
        console.log(user);
        console.log(user._id);

        const coordinates = [longitude, latitude];
        await position.findOneAndUpdate(
            {user: user._id},
            {user, created: Date.now(), loc: {type: 'Point', coordinates}},
            {upsert: true, new: true}
        ).exec();

        const nearbyFriendsPositions = await findNearbyFriends(coordinates, distance);

        return {
            friends: nearbyFriendsPositions.map(friendPos => {
                return {
                    username: friendPos.user.username,
                    latitude: friendPos.loc.coordinates[0],
                    longitude: friendPos.loc.coordinates[1]
                };
            })
        }
    } else {
        return errorMsg;
    }

    return user;

}

async function findNearbyFriends(coordinates, distance) {
    return await Position.find({
        loc: {
            $near: {
                $geometry: {type: 'Point', coordinates},
                $minDistance: 0.01,
                $maxDistance: distance
            }
        }
    })
        .populate('user')
        .exec();
}

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports = {
    userLogin: userLogin,
    isEmpty: isEmpty
};