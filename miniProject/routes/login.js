var express = require('express');
var router = express.Router();

const loginFacade = require('../facades/loginFacade');
const userFacade = require('../facades/userFacade');
const positionFacade = require('../facades/positionFacade');

const errorMsg = {msg: "wrong username", status: 403}; //(StatusCode = 403);

router.post('/', async function (req, res, next) {
    console.log("LOGIN ENDPOINT");
    var username = req.body.username;
    var password = req.body.password;
    var lat = req.body.latitude;
    var long = req.body.longitude;
    var radius = req.body.radius;

    var pos = await loginFacade.userLogin(username, password, long, lat, radius);

    res.json(pos);
    next();
});

//Get POS for specific user by username
router.get('/:username', async function (req, res, next) {
    var username = req.params.username;

    var user = await userFacade.findByUsername(username);
    if ( loginFacade.isEmpty(user) ) {
        res.json(errorMsg);
        return;
    }

    var userId = user[0]._id;

    var pos = await positionFacade.getPosition(userId);

    res.json(pos);
    next();

});

module.exports = router;