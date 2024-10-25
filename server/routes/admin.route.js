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

    conn.query(orders, (err, ordersData) => {
        if (err) throw err;

        conn.query(totalRegisteredAccount, (err, countData) => {
            if (err) throw err;
            
            conn.query(totalProductsOrdered, (err, productsData) => {
                if (err) throw err;

                const count = countData[0].count;
                const productCount = productsData[0].count;

                res.render('admin', {
                    orders: ordersData,
                    accounts: count,
                    title: "Admin",
                    products: productCount
                });
            })
        });
    });
})

router.post('/delete/:id', (req, res) => {    
    const del_id = parseInt(req.params.id);

    if (isNaN(del_id)) {
        return res.status(400).send(`
            <script>
                alert("Invalid ID");
                window.location.href="/admin";
            </script>
        `);
    }

    const deleteProduct = "DELETE FROM orders WHERE id = ?";

    conn.query(deleteProduct, [del_id], (err, result) => {
        if (err) throw err;

        if(result.affectedRows === 0){
            res.send(`
                <script>
                    alert("Product not found");
                    window.location.href="/admin";    
            `)
        }

        return res.status(200).send(`
            <script>
                alert("Product deleted");
                window.location.href="/admin";
            </script>
        `);
    });
});

module.exports = router;