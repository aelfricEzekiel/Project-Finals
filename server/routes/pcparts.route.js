const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pcparts', {
        title: "PC Components",
        footer: "WeIT: Online IT Essentials Shop"
    })
})

module.exports = router;