const express = require('express');
const conn = require('../mysql/conn');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('order', {
        title: "Order",
        footer: "WeIT: Online IT Essentials Shop"
    })
})

router.post('/orderLaptops', (req, res) => {
    const id = 0;
    const name = req.body.name;
    const email = req.body.email;
    const contactNo = req.body.contactNo;
    const count = req.body.count;
    const orders = req.body.orders;
    const address = req.body.address;

    const insertQuery = `INSERT INTO orders VALUES ("${id}", "${name}", "${email}", "${contactNo}", "${count}", "${orders}", "${address}")`;

    conn.query(insertQuery, (err, result) => {
        if(err) throw err;

        console.log("Orders Succssful!");
        res.redirect('/order');
    })
})

module.exports = router;