const express = require('express');
const index = require('./index.route');
const route =  express.Router();

route.get('/about.ejs', (req, res) => {
    res.render('about', {
        title: "About",
        about: "WeIT: Online IT Essentials Shop"
    })

    res.redirect('index.ejs');
})

module.exports = route;


