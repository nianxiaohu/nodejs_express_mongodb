const User = require('../models/User.js');
const path = require('path');

module.exports = (req, res) => {
    User.create(req.body).then(newUser => {
        console.log(newUser);
        res.redirect('/');
    }).catch(error => {
        console.log("Error here");
        console.log(error);
        /*temp solution for error TypeError: Cannot convert undefined or null to object
at Object.keys (<anonymous>)*/
        //const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
        //req.flash('validationErrors', validationErrors)
        //req.flash('data', req.body)
        return res.redirect('/auth/register');
    })
};