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

router.get('/', isAuth, (req, res) => {
    const ordersQuery = `SELECT * FROM orders`;

    conn.query(ordersQuery, (err, data) => {
        if (err) throw err;

        res.render('order', {
            title: "Order",
            footer: "WeIT: An Online IT Essentials Shop",
            getOrders: data
        })
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