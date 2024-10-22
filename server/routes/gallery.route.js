const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('gallery', {
        title: "Gallery",
        footer: "WeIT: Online IT Essentials Shop"
    })
})

module.exports = router;