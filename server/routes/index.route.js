const express = require('express');
const conn = require('../mysql/conn');
const session = require('express-session')
const route = express.Router();

route.get('/', (req, res) => {
    res.render('index', {
        title: "WeIT: Online IT Essentials Shop"
    })
})

route.post('/ordersHomePage', (req, res) => {
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
        
        console.log("Orders Succesful");
    })
    res.redirect('/');
})

module.exports = route;