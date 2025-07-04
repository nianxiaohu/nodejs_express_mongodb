const BlogPost = require('../models/BlogPost.js');
const path = require('path');

module.exports = (req, res) => {
    /*Current features requires users must submit a pic, make it optional*/
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..', 'public/img', image.name), async (error) => {
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        })
        res.redirect('/');
    })
}