var express = require('express');
var router = express.Router();

var userFacade = require('../facades/userFacade');

/* GET users listing. */
router.get('/all', async function (req, res, next) {
    var users = await userFacade.getAllUsers();

    res.json(users);
});

router.get('/:username', async function (req, res, next) {
    var username = req.params.username;
    var user = await userFacade.findByUsername(username);
    res.json(user);
});

router.post('/add', async function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    var user = await userFacade.addUser(username, password, firstName, lastName, email)
        .then((data) => {
            return data
        })
        .catch((err) => {
            res.json(err.toString());
        });
    // returns the user
    console.log(user);
    res.json(user);
});

module.exports = router;