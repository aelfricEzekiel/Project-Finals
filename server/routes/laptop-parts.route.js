const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('laptop-parts', {
        title: "Laptop Parts",
        footer: "WeIT: Online IT Essentials Shop"
    })
})

module.exports = router;