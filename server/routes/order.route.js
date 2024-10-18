const express = require('express');

const router = express.Router();

router.get('/order.ejs', (req, res) => {
    res.render('order', {
        title: "Order"
    })
})

module.exports = router;