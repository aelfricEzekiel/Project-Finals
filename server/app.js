const app = require('./express/express');
const index = require('./routes/index.route');
const login = require('./routes/login.route');
const about = require('./routes/about.route');
const pcparts = require('./routes/pcparts.route');
const order = require('./routes/order.route');
const laptopParts = require('./routes/laptop-parts.route');
const gallery = require('./routes/gallery.route');
const signup = require('./routes/signup.route');
const logout = require('./routes/logout.route');
const admin = require('./routes/admin.route');
const conn = require('./mysql/conn');

app.use('/admin', admin);

app.use('/signup', signup);

// route for landing page
app.use('/', index);

// route for login
app.use('/login', login);

// redirects to the about page
app.use('/about', about);

app.use('/pcparts', pcparts);

app.use('/order', order);

app.use('/laptopParts', laptopParts);

app.use('/gallery', gallery);

app.use('/logout', logout);

const isAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.get('/delete/:id', isAuth, (req, res) => {
    const del_id = parseInt(req.params.id);

    if (isNaN(del_id)) {
        return res.status(400).send(`
            <script>
                alert("Invalid ID");
                window.location.href="/admin";
            </script>
        `);
    }

    const deleteProduct = `DELETE FROM orders WHERE id = ?`;

    conn.query(deleteProduct, [del_id], (err, result) => {
        if (err) throw err;

        if (result.affectedRows === 0) {
            return res.send(`
                <script>
                    alert("Product not found");
                    window.location.href="/admin";    
                </script>
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

app.get('/feedbackDashboard', (req, res) => {
    const feedbacks = "SELECT * FROM feedback";
    const totalRegisteredAccount = "SELECT COUNT(*) AS count FROM signup";
    const totalProductsOrdered = "SELECT COUNT(*) AS count FROM orders"
    const totalFeedbacks = "SELECT COUNT(*) AS count FROM feedback";

    conn.query(feedbacks, (err, fbData) => {
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

                    res.render('feedback', {
                        feedbackData: fbData,
                        accounts: count,
                        title: "Feedback Dashboard",
                        products: productCount,
                        feedback: feedbackCount
                    });
                })
            });
        });
    });
})
app.get('/updateProduct/:id', isAuth, (req, res) => {
    const id = req.params.id;

    const name = req.body.name;
    const email = req.body.email;
    const contactNo = req.body.contactNo;
    const quantity = req.body.count;
    const orders = req.body.orders;
    const price = req.body.price;
    
    const updateProduct = `UPDATE orders SET name = "${name}", email = "${email}", contactNo = "${contactNo}", count = "${quantity}", orders = "${orders}", price = "${price}" WHERE id = "${id}"`; 

    conn.query(updateProduct, (err) => {
        if(err) throw err;

        res.send(`
            <script>
                alert("Product Updated");
                window.location.href="/admin";
            </script>
        `);
    });
});

app.get('/productTracking', isAuth, (req, res) => {
    const track = "SELECT count, orders, price FROM orders";

    conn.query(track, (err, trackData) => {
        if(err) throw err;

        res.json(trackData);
    })
})

app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server is running at http://${app.get('host')}:${app.get('port')}`);
});