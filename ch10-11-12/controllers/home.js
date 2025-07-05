const BlogPost = require('../models/BlogPost.js');
const User = require('../models/User.js');
module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({});
    for (let i = 0; i < blogposts.length; i++) {
        if (typeof blogposts[i].userid != "undefined") {
            console.log("home.js");
            console.log(typeof blogposts[i].userid);
            console.log(Object.keys(blogposts[i].userid));
        }
    }
    console.log(req.session);
    res.render('index', {
        blogposts
    });
}