var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LocationBlogSchema = new Schema({
    created: {type: Date, default: Date.now(), required: true},
    lastUpdated: Date,
    info: String,
    slug: String,
    img: String,
    pos: {
        longitude: {type: Number, required: true},
        latitude: {type: Number, required: true}
    },
    //author: {type: Schema.ObjectId, }
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
    //likedBy: [Schema.Types.ObjectId]
    likedBy: {type: [Schema.Types.ObjectId], ref: "User"}
});

LocationBlogSchema.virtual("likedByCount").get(function() {
    return this.likedBy.length;
});

LocationBlogSchema.pre("update", function (next) {
    this.update({}, {$set: {lastUpdated: new Date()}});
    next();
});

var LocationBlog = mongoose.model("LocationBlog", LocationBlogSchema);

module.exports = LocationBlog;

