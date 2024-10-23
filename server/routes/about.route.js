const express = require('express');
const index = require('./index.route');
const route =  express.Router();

const isAuth = (req, res, next) => {
    if(req.session.user){
        next();
    } else {
        res.redirect('/login');
    }
}

route.get('/', isAuth, (req, res) => {
    res.render('about', {
        title: "About",
        about: "WeIT: Online IT Essentials Shop"
    })
})

module.exports = route;


