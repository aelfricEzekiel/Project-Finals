const express = require('express');
const router = express.Router();

const isAuth = (req, res, next) => {
    if(req.session.user){
        next();
    } else {
        res.redirect('/login');
    }
}

router.get('/', isAuth, (req, res) => {
    res.render('pcparts', {
        title: "PC Components",
        footer: "WeIT: Online IT Essentials Shop"
    })
})

module.exports = router;