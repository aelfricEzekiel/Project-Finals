const express = require('express');
const conn = require('../mysql/conn');
const router = express.Router();

const isAuth = (req, res, next) => {
    if(req.session.user){
        next();
    } else {
        res.redirect('/login');
    }
}

const products = [
    {id: 1, name: "W-Keyboard", price: 540.00, images: "images/ch/keyboard.png", description: "Wireless Keyboard"},
    {id: 2, name: "W-Keyboard 2", price: 1350.00, images: "images/ch/keyboard1.png", description: "Wireless Mechanical Keyboard RGB"},
    {id: 3, name: "ASUS Mouse", price: 550.00, images: "images/ch/m1.png", description: "ASUS Gaming Mouse"},
    {id: 4, name: "Lyph Mouse", price: 820.00, images: "images/ch/m2.png", description: "Lyph Gaming Mouse"},
    {id: 5, name: "SSD 128GB", price: 1160.00, images: "images/ch/ssd.png", description: "Solid State Drive 128GB"},
    {id: 6, name: "Hard Disk Drive (HDD) 1TB", price: 3000.00, images: "images/ch/hdd.png", description: "Hard Disk Drive 1TB"},
    {id: 7, name: "Graphics Processing Unit (GPU) RTX 3080", price: 5000.00, images: "images/ch/rtx.png", description: "NVIDIA Geforce RTX 3080"},
    {id: 8, name: "Graphics Processing Unit (GPU) RTX 4090", price: 20000.00, images: "images/ch/rtx2.png", description: "NVIDIA Geforce RTX 4090"}
];

router.get('/', isAuth, (req, res) => {
    const userCheckQuery = "SELECT * FROM signup";

    conn.query(userCheckQuery, (err, data) => {
        if (err) throw err;
        
        res.render('pcparts', {
            title: "PC Components",
            footer: "WeIT: Online IT Essentials Shop",
            product: products,
            getData: data
        })
    })
})

module.exports = router;