const express = require('express');
const conn = require('../mysql/conn');
const route = express.Router();

route.get('/', (req, res) => {
    res.render('index', {
        title: "WeIT: Online IT Essentials Shop"
    })
})

route.post('/orders', (req, res) => {

    const id = 0;
    const name = req.body.customer_name;
    const email = req.body.customer_email;
    const contactNo = req.body.customer_contactNo;
    const count = req.body.customer_count;
    const orders = req.body.customer_orders;
    const address = req.body.customer_address;

    const insertQuery = `INSERT INTO orders VALUES ("${id}", "${name}", "${email}", "${contactNo}", "${count}", "${orders}", "${address})`;

    conn.query(insertQuery, (err, result) => {
        if(err) throw err;

        res.sendStatus(200).send(`
            <script>
                alert("Order Succesful");   
                window.location.href="/";
            </script>
        `)
    })
})

module.exports = route;