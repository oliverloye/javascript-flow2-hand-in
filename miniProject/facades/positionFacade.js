const Position = require('../models/position');

async function getPosition(userId) {
    return await Position.find({
        "user": userId
    });
}

async function addPosition(long, lat, userId) {
    var position = positionCreator(long, lat, userId, true);
    await Position.save(position);
    //await Position.insertMany(positions);
}

module.exports = {
    getPosition: getPosition,
    addPosition: addPosition
};