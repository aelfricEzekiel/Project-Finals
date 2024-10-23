const express = require('express');
const conn = require('../mysql/conn');
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

route.get('/', isAuth, (req, res) => {
    res.render('index', {
        title: `WeIT: Online IT Essentials Shop`,
    });
});

route.post('/ordersHomePage', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const contactNo = req.body.contactNo;
    const count = req.body.count;
    const orders = req.body.orders;
    const price = req.body.price;

    const insertQuery = `INSERT INTO orders (name, email, contactNo, count, orders, price) VALUES (?, ?, ?, ?, ?, ?)`;

    conn.query(insertQuery, [name, email, contactNo, count, orders, price], (err, result) => {
        if(err) throw err;
        
        console.log("Orders Succesful");
    })
    res.redirect('/');                  
})

module.exports = route;