const express = require('express');
const router = express.Router();

router.get('/pcparts.ejs', (req, res) => {
    res.render('pcparts', {
        title: "PC Components"
    })
})

module.exports = router;