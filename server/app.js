const app = require('./express/express');
const conn = require('./mysql/conn');

// Landing page
app.get('/', (req, res) => {
    res.render('index', {
        title: "WeIT: Online IT Essentials Shop"
    })
});

app.post('/ordersHomePage', (req, res) => {
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
// redirects to the about page
app.get('/about.ejs', (req, res) => {
    res.render('about', {
        title: "About",
        about: "WeIT: Online IT Essentials Shop"
    })
});

app.get('/order.ejs', (req, res) => {
    res.render('order', {
        title: "Order"
    })
});

app.post('/orderLaptops', (req, res) => {
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

        console.log("Orders Inserted!");
    })
})
app.get('/pcparts.ejs', (req, res) => {
    res.render('pcparts', {
        title: "PC Components"
    })
});

app.get('/laptop-parts.ejs', (req, res) => {
    res.render('laptop-parts', {
        title: "Laptop Parts",
        footer: "WeIT: Online IT Essentials Shops"
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