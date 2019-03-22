var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var JobSchema = new Schema({
    type: String,
    company: String,
    companyUrl: String
});

var UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: {type: String, unique: true, required: true},
    created: {type: Date, default: Date.now(), required: true},
    lastUpdated: Date,
    job: [JobSchema]
});

UserSchema.pre("save", function (next) {
    this.password = "Hash me please and add some salt: " + this.password;
    next();
});

UserSchema.pre("update", function (next) {
    this.update({}, {$set: {lastUpdated: new Date()}});
    next();
});

var User = mongoose.model("User", UserSchema);

module.exports = User;