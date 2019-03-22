const LocationBlog = require('../models/locationBlog');

async function addLocationBlog(info, slug, img, pos, author, likedByUserID) {
    var blog = new LocationBlog({
        info,
        slug,
        img,
        pos,
        author,
        likedByUserID
    });
    await blog.save();

}


async function likeLocationBlog(blogid, userid){
    var blog = await LocationBlog.findOneAndUpdate({_id : [blogid]}, { $push: {likedBy: userid} }, {new: true}).exec();
    return blog;
}

module.exports = {addLocationBlog, likeLocationBlog};