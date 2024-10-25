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
    {id: 1, name: "SSD 128GB", price: 1000, description: "Solid State Drive 128GB", images: "images/lp/ram.png"},
    {id: 2, name: "NVME PCLE SSD", price: 1330, description: "Read Only Memory (ROM) 128GB", images: "images/lp/ssd.jpg"},
    {id: 3, name: "Cooling Fan", price: 1750, description: "Cooling Fan RGB", images: "images/lp/cool.jpg"},
    {id: 4, name: "Laptop Bag", price: 3000, description: "Laptop Bag", images: "images/lp/bag.png"},
    {id: 5, name: "USB Hub", price: 3000, description: "USB Hub 3 Ports", images: "images/lp/hub.png"},
    {id: 6, name: "Docky", price: 5000, description: "Docky Hub 3 Ports", images: "images/lp/dock.png"},
    {id: 7, name: "White Wireless Keyboard", price: 3500, description: "Wireless Keyboard", images: "images/lp/wireless.jpg"},
    {id: 8, name: "Laptop Stand", price: 2500, description: "Laptop Stand", images: "images/lp/stand.jpg"}
]

router.get('/', isAuth, (req, res) => {
    const checkUserQuery = "SELECT * FROM signup";

    conn.query(checkUserQuery, (err, data) => {
        if (err) throw err;

        res.render('laptop-parts', {
            title: "Laptop Parts",
            footer: "WeIT: Online IT Essentials Shop",
            product: products,
            getData: data
        })
    })
})

module.exports = router;