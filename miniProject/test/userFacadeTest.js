const expect = require("chai").expect;
const mongoose = require('mongoose');

const dbConnect = require('../dbConnect');
dbConnect(require('../settings').TEST_DB_URI);

const User = require('../models/user');
const userFacade = require('../facades/userFacade');
const testData = require('../makeTestUsers');

describe('Testing userFacade', function () {

    before(async function () {
        // Removes all Users to test it again
        await userFacade.deleteAllUsers();
        await testData.makeTestData();
    });

    it('Test if the User is in the DB', async function () {
        var user = await User.find({firstName: "Olle"});
        expect(user[0].lastName).to.be.equal("Bolle", "Check for lastname");
        expect(user[0].email).to.be.equal('olle@bolle.dk', "check for email");
    });

    it("Test if you can get all Users", async function () {
        var users = await userFacade.getAllUsers();
        expect(users[0].firstName).to.be.equal("Olle");
        expect(users[1].firstName).to.be.equal("BOlle");
        expect(users[2].firstName).to.be.equal("COlle");
    });

    it("Test if you can find User by username", async function () {
        var user = await userFacade.findByUsername("test2");
        expect(user[0].firstName).to.be.equal("BOlle");
    });

    it("Test if you can add a new user", async function () {
        var newUser = await userFacade.addUser(
            "newUsername",
            "newPassword",
            "newFirstName",
            "newLastName",
            "newEmail"
        );
        var foundUser = await userFacade.findByUsername("newUsername");
        expect(foundUser[0].username).to.be.equal("newUsername");

    });

    after(async function () {
        // at the end of the test do something...
        // dbConnect.prototype.close
        //dbConnect.connection.close()
        await mongoose.disconnect();
    });

});
