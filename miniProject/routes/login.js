var express = require('express');
var router = express.Router();

const loginFacade = require('../facades/loginFacade');
const userFacade = require('../facades/userFacade');
const positionFacade = require('../facades/positionFacade');

router.post('/', async function (req, res, next) {
    console.log("LOGIN ENDPOINT");
    var username = req.body.username;
    var password = req.body.password;
    var lat = req.body.latitude;
    var long = req.body.longitude;
    var radius = req.body.radius;

    var user = await loginFacade.userLogin(username, password, long, lat, radius); //, function (err) {
        // if(err) {
        //     return res.json({msg: "wrong username or password", status: 403});
        // } else {
        //     next();
        // }
    //});

    res.json(user);
});

router.get('/:username', async function (req, res, next) {
    var username = req.params.username;

    var user = await userFacade.findByUsername(username);
    var userId = user[0]._id;

    var pos = await positionFacade.getPosition(userId);

    res.json(pos);

});

module.exports = router;