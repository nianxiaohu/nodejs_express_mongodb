const express = require('express');
const path = require('path');

const app = new express();
const ejs = require('ejs');
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.listen(4000, () => {
    console.log('App listening on port 4000');
});
const user={name:'xiaohu'};
app.get('/', (req, res) => {
    res.render('index',{'user':user});
});

app.get('/about', (req, res) => {
    res.render('about',{'user':user});
});

app.get('/contact', (req, res) => {
    res.render('contact',{'user':user});
});

app.get('/post', (req, res) => {
    res.render('post',{'user':user});
});