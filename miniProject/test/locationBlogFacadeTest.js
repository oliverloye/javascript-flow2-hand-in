const mongoose = require('mongoose');
const expect = require("chai").expect;
const connect = require('../dbConnect.js');
const db_con = require('../settings').TEST_DB_URI;
const User = require('../models/user');
const LocationBlog = require('../models/locationBlog');
const testData = require('../makeTestUsers');

const blogFacade = require('../facades/blogFacade');
const userFacade = require('../facades/userFacade');

describe('Testing the blogFacade', function () {
    /* Connect to the TEST-DATABASE */
    before(async function () {
        await connect(db_con);
        await userFacade.deleteAllUsers();
        await testData.makeTestData();
    });

    var locationBlogs = [];
    var users = [];
    /* Setup the database in a known state (2 users) BEFORE EACH test */
    beforeEach(async function () {
        await LocationBlog.deleteMany({});
        users = await userFacade.getAllUsers();
        locationBlogs = await LocationBlog.insertMany([
            {
                info: 'place 1',
                img: 'img1.png',
                pos: {longitude: 30, latitude: 50},
                author: users[0]._id
            },
            {
                info: 'place 2',
                img: 'img2.png',
                pos: {longitude: 13, latitude: 28},
                author: users[0]._id
            }
        ]);
    });

    it('Should find all locationblogs (place 1 and place 2)', async function () {
        var blogs = await blogFacade.getAllLocationBlogs();
        expect(blogs.length).to.be.equal(2);
    });

    it('Should find place 1 by id', async function () {
        var locationBlog = await blogFacade.findById(locationBlogs[0]._id);
        expect(locationBlog.info).to.be.equal('place 1');
    });

    it('Should find place 1 by info', async function () {
        var locationBlog = await blogFacade.findByInfo(locationBlogs[0].info);
        expect(locationBlog.info).to.be.equal('place 1');
    });

    it('Should add place 3', async function () {
        var locationBlog = await blogFacade.addLocationBlog(
            "place 3",
            'img3.png',
            {longitude: 13, latitude: 17},
            users[1]._id
        );
        expect(locationBlog).to.not.be.null;
        expect(locationBlog.info).to.be.equal("place 3");
        var blogs = await blogFacade.getAllLocationBlogs();
        expect(blogs.length).to.be.equal(3);
    });

    it('Should like place 2 for user, test1', async function () {
        var locationBlog = await blogFacade.findById(locationBlogs[1]._id);
        expect(locationBlog.likedBy).to.be.empty;
        locationBlog = await blogFacade.likeLocationBlog(
            locationBlogs[1]._id,
            users[0]._id
        );
        expect(locationBlog).to.not.be.null;
        expect(locationBlog.info).to.be.equal('place 2');
        expect(locationBlogs.length).to.be.equal(2);
        expect(locationBlog.likedBy).to.be.contains(users[0]._id);
    });

    after(async function () {
        await mongoose.disconnect();
    });
});
