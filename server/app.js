const app = require('./express/express');
const conn = require('./mysql/conn');

// Landing page
app.get('/', (req, res) => {
    res.render('index', {
        title: "WeIT: Online IT Essentials Shop"
    })
});

app.post('/orders', (req, res) => {
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
// redirects to the about page
app.get('/about.ejs', (req, res) => {
    res.render('about', {
        title: "About",
        about: "WeIT: Online IT Essentials Shop"
    })

    res.redirect('/');
});

app.get('/order.ejs', (req, res) => {
    res.render('order', {
        title: "Order"
    })
});

app.get('/pcparts.ejs', (req, res) => {
    res.render('pcparts', {
        title: "PC Components"
    })
});

app.get('/laptop-parts.ejs', (req, res) => {
    res.render('laptop-parts', {
        title: "Laptop Parts"
    })
});

app.get('/gallery.ejs', (req, res) => {
    res.render('gallery', {
        title: "Gallery"
    })
});

app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server is running at http://${app.get('host')}:${app.get('port')}`);
})