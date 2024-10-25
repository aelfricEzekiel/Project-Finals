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
    const userCheckQuery = "SELECT * FROM signup";
    const {name, price} = req.query;

    conn.query(userCheckQuery, (err, data) => {
        if (err) throw err;

        res.render('order', {
            title: "Order",
            footer: "WeIT: An Online IT Essentials Shop",
            product: {
                name,
                price
            },
            getData: data,
        })
    })
})

router.post('/orderLaptops', isAuth, (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const contactNo = req.body.contactNo;
    const quantity = parseInt(req.body.count);
    const orders = req.body.orders;
    const price = parseFloat(req.body.price);
    let total = 0;
    const insertQuery = `INSERT INTO orders (name, email, contactNo, count, orders, price) VALUES (?, ?, ?, ?, ?, ?)`;
    
    if(!name || !email || !contactNo || !quantity || !orders || !price){
        res.send(`
            <script>
                alert("Input fields are required");
                window.location.href="/order";
            </script>
        `)
    }

    if(quantity >= 1){
        total = price * quantity;
    } else {
        res.send(`
            <script>
                alert("Quantity is less than 1");
                window.location.href="/pcparts";
            </script>
        `)
    }


    conn.query(insertQuery, [name, email, contactNo, quantity, orders, total], (err, result) => {
        if(err) {
            res.send(`
                <script>
                    alert("Order Unsuccessful");
                    window.location.href="/";
                </script>
            `)
        }

        res.send(`
            <script>
                alert("Order Successful");
                window.location.href="/";
            </script>
        `)
    })
})

module.exports = router;