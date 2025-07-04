const User = require('../models/User.js');
const path = require('path');

module.exports = (req, res) => {
    User.create(req.body).then(newUser => {
        console.log(newUser);
        res.redirect('/');
    }).catch(error => {
        /*temp solution for error TypeError: Cannot convert undefined or null to object
at Object.keys (<anonymous>)*/
        const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        console.log("error_xiaohu")
        console.log(Object.getOwnPropertyNames(error));
        console.log("error.errors_xiaohu")
        console.log(Object.getOwnPropertyNames(error.errors));
        console.log(Object.getOwnPropertyNames(error.errors['username']));
        const keys = Object.getOwnPropertyNames(error.errors['username']);
        for (let i = 0; i < keys.length; i++) {
            console.log("xiaohunian");
            console.log(keys[i]);
            console.log(error.errors['username'][keys[i]]);
        }
        ;
        return res.redirect('/auth/register');
    })
};