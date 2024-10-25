const express = require('express');
const conn = require('../mysql/conn');
const { response } = require('../express/express');
// const jwt = require('jsonwebtoken');

const route = express.Router();

const isAuth = (req, res, next) => {
    /*const token = req.headers['authorization'];

    if(!token) {
        return res.status(403).send(`
            <script>
                alert("Token required");
                window.location.href="/login";
            </script>
        `);
    }

    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
        if (err) {
            return res.status(400).send(`
                <script>
                    alert("Invalid token");
                    window.location.href="/login";
                </script>
            `)
        }

        if(req.user = user){
            next();
        } else {
            res.redirect('/login'); 
        }
    })*/
    if(req.session.user){
        next();
    } else {
        res.redirect('/login');
    }
}

const products = [
    {id: 1, name: "Zippy Wireless Mouse", price: 1580, images: "images/ch/mouse.jpg", par: ""},
    {id: 2, name: "Whiskers Wireless Keyboard", price: 1520, images: "images/lp/wireless.jpg"},
    {id: 3, name: "Dash Wireless Keyboard", price: 6750, images: "images/lp/mech.webp"},
    {id: 4, name: "Pebble High-Spec System Unit", price: 4000, images: "images/lp/case.webp"},
    {id: 5, name: "Drawing Tablet", price: 12000, images: "images/lp/pad.jpg"},
    {id: 6, name: "PIP Monitor", price: 1500, images: "images/lp/screen.jpg"}
];

route.get('/', isAuth, (req, res) => {
    const checkUserQuery = "SELECT * FROM signup";
    conn.query(checkUserQuery, (err, data) => {
        if(err) throw err;

        res.render('index', {
            title: "WeIT: Online IT Essentials Shop",
            product: products,
            getData: data,
        });
    });
});

route.post('/ordersHomePage', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const contactNo = req.body.contactNo;
    const quantity = parseInt(req.body.count);
    const orders = req.body.orders;
    const price = parseFloat(req.body.price);

    let total = 0
    
    if(!name || !email || !contactNo || !quantity || !orders || !price) {
        res.send(`
            <script>
                alert("Input fields are required!");
                window.location.href="/";
            </script>    
        `)
    }

    if(quantity >= 1 ){
        total = price * quantity;
    } else {
        res.send(`
            <script>
                alert("Quantity is less than 1");
                window.location.href="/";
            </script>
        `)
    }

    const insertQuery = `INSERT INTO orders (name, email, contactNo, count, orders, price) VALUES (?, ?, ?, ?, ?, ?)`;

    conn.query(insertQuery, [name, email, contactNo, quantity, orders, total], (err, result) => {
        if(err) {
            res.send(`
                <script>
                    alert("Order Unsuccesful");
                    window.location.href="/";
                </script>
            `)
        };
        
        res.send(`
            <script>
                alert("Order Successful!");
                window.location.href="/";
            </script>
        `);              
    })
})

module.exports = route;