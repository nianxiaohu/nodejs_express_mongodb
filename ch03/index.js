const express = require('express');
const path = require('path');
const path_2 = path;
const app = new express();
const test_flag = true;

app.use('/static',express.static('public'));
// Serving multiple static folders, /??/
app.use('/static_',express.static('startbootstrap-clean-blog-gh-pages'));

app.listen(4000, () => {
    console.log('App listening on port 4000');
});

app.get('/', (req, res) => {
    if (test_flag ==true){
        res.sendFile(path.resolve(__dirname, 'pages_xhu_test/index.html'));
    }
    else {res.sendFile(path.resolve(__dirname, 'pages/index.html'));}
});

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'))
});

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
});

app.get('/post', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'))
});