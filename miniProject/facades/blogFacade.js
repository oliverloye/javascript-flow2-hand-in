const LocationBlog = require('../models/locationBlog');

async function addLocationBlog(info, img, pos, author, likedByUserID) {
    var blog = new LocationBlog({
        info: info,
        img: img,
        pos: pos,
        author: author,
        likedByUserID: likedByUserID
    });
    await blog.save();
    return blog;

}

async function getAllLocationBlogs() {
    var allBlogs = await LocationBlog.find({});
    return allBlogs;
}

async function findByInfo(info) {
    return await LocationBlog.findOne({ info }).exec();
}

async function findById(id) {
    return await LocationBlog.findById({ _id: id }).exec();
}


async function likeLocationBlog(blogid, userid){
    var blog = await LocationBlog.findOneAndUpdate({_id : [blogid]}, { $push: {likedBy: userid} }, {new: true}).exec();
    return blog;
}

module.exports = {
    addLocationBlog,
    likeLocationBlog,
    getAllLocationBlogs,
    findByInfo,
    findById
};