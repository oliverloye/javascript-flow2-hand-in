var connect = require("./dbConnect.js");
connect(require("./settings").TEST_DB_URI);

var User = require("./models/user.js");
var LocationBlog = require("./models/locationBlog.js");
var Position = require("./models/position.js");

function positionCreator(lon, lat, userId, dateInFuture) {
    var posDetail = {user: userId, loc: {coordinates: [lon, lat]}};
    if (dateInFuture) {
        posDetail.created = "2022-09-25T20:40:21.899Z"
    }
    return posDetail;
}

async function makeTestData() {
    await User.deleteMany({});
    await Position.deleteMany({});
    await LocationBlog.deleteMany({});
    console.log("Making test users");
    try {
        var myUsers =
            [
                {
                    username: "test1",
                    password: "test",
                    firstName: "Olle",
                    lastName: "Bolle",
                    email: "olle@bolle.dk",
                    job: [{
                        type: "type placeholder",
                        company: "My Cool Company",
                        companyUrl: "www.mycoolcompany.com"
                    },
                        {
                            type: "type placeholder",
                            company: "My awesome Company",
                            companyUrl: "www.myawesomecompany.com"
                        }]

                },
                {
                    username: "test2",
                    password: "test",
                    firstName: "BOlle",
                    lastName: "KBolle",
                    email: "Bolle@Kbolle.dk",
                    job: [{
                        type: "type placeholder",
                        company: "My Cool Company",
                        companyUrl: "www.mycoolcompany.com"
                    },
                        {
                            type: "type placeholder",
                            company: "My awesome Company",
                            companyUrl: "www.myawesomecompany.com"
                        }]

                },
                {
                    username: "test3",
                    password: "test",
                    firstName: "COlle",
                    lastName: "CBolle",
                    email: "Colle@bolle.dk",
                    job: [{
                        type: "type placeholder",
                        company: "My Cool Company",
                        companyUrl: "www.mycoolcompany.com"
                    },
                        {
                            type: "type placeholder",
                            company: "My awesome Company",
                            companyUrl: "www.myawesomecompany.com"
                        }]

                }
            ];

        var users = await User.insertMany(myUsers);
        //var newUser = new User({username: "test4", password: "test", firstName: "Dolly", lastName: "Parton", email: "dolly@parton.com"});
        //await newUser.save();
        console.log(users);

        var positions = [positionCreator(10, 11, users[0]._id), positionCreator(11, 12, users[1]._id, true)
        ];
        await Position.insertMany(positions);
        // var blogs = [{info: "Cool Place", pos: {longitude: 26, latitude: 57}, author: users[0]._id}]
        // await LocationBlog.insertMany(blogs);

    } catch (err) {
        console.log(err);
    }
};

makeTestData();

module.exports = {makeTestData: makeTestData};
