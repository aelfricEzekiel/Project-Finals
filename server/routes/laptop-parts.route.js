const express = require('express');
const router = express.Router();

router.get('/laptop-parts.ejs', (req, res) => {
    res.render('laptop-parts', {
        title: "Laptop Parts"
    })
})

module.exports = router;