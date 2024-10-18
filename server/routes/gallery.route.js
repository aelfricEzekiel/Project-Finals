const express = require('express');
const router = express.Router();

router.get('/gallery.ejs', (req, res) => {
    res.render('gallery', {
        title: "Gallery"
    })
})

module.exports = router;