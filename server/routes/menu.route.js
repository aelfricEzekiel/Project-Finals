const express = require('express');
const router = express.Router();

router.get('/menu.ejs', (req, res) => {
    res.render('menu', {
        title: "Menu"
    })
})

module.exports = router;