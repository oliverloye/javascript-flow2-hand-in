const expect = require("chai").expect;

const User = require('../models/user');
const LocationBlog = require('../models/locationBlog');

const blogFacade = require('../facades/blogFacade');
const userFacade = require('../facades/userFacade');

// Connects to test-DB in mongoDB
require('../dbConnect')(require('../settings').TEST_DB_URI);

describe("Testing blogFacade", function () {

    before(async function () {
        await LocationBlog.deleteMany({});
    });

    it("Test creation of a blog and add it to a user", async function () {

        //var findUser = await User.find({})
        var userId = await User.find({firstName: "firstname"}) //.select({_id: 1}).exec();
            // .then((data) => {
            //     if (data !== []) {
            //         return data[0]
            //     } else {
            //         throw Error("User you were looking for doesnt exist")
            //     }
            //
            // })
            // .catch((err) => err);
        console.log(userId);

        var log = await blogFacade.addLocationBlog("This is info", "this is slug", "this is img", {longitude:70,latitude:90}, userId, "no likes yet")
            .catch((err) => {
                throw err
            });

        expect(log.author).to.be.equal(userId);

    });

    // it("test if user can like a blog", async function () {
    //     var users = await User.find({}).select({_id: 1, firstName: 1}).exec()
    //         .then((data) => {
    //             if (data !== []) {
    //                 return [data[1], data[2]]
    //             } else {
    //                 throw Error("User you were looking for doesnt exist")
    //             }
    //         })
    //         .catch((err) => err);
    //
    //     log = await blogFacade.likeLocationBlog(log._id, [users[0]._id, users[1]._id]);
    //
    //     expect(log.likedBy.length).to.be.equal(2);
    //
    // })

});
