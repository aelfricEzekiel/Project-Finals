const express = require('express');
const index = require('./index.route');
const route =  express.Router();

route.get('/', (req, res) => {
    res.render('about', {
        title: "About",
        about: "WeIT: Online IT Essentials Shop"
    })
})

module.exports = route;


