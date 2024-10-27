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
    const orders = "SELECT * FROM orders";
    const totalRegisteredAccount = "SELECT COUNT(*) AS count FROM signup";
    const totalProductsOrdered = "SELECT COUNT(*) AS count FROM orders"
    const totalFeedbacks = "SELECT COUNT(*) AS count FROM feedback";

    conn.query(orders, (err, ordersData) => {
        if (err) throw err;

        conn.query(totalRegisteredAccount, (err, countData) => {
            if (err) throw err;
            
            conn.query(totalProductsOrdered, (err, productsData) => {
                if (err) throw err;

                conn.query(totalFeedbacks, (err, feedbackData) => {
                    if (err) throw err;

                    const count = countData[0].count;
                    const productCount = productsData[0].count;
                    const feedbackCount = feedbackData[0].count;

                    res.render('admin', {
                        orders: ordersData,
                        accounts: count,
                        title: "Admin",
                        products: productCount,
                        feedback: feedbackCount
                    });
                })
            })
        });
    });
})
module.exports = router;