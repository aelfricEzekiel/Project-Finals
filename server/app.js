const app = require('./express/express');
const index = require('./routes/index.route');
const login = require('./routes/login.route');
const about = require('./routes/about.route');
const pcparts = require('./routes/pcparts.route');  
const order = require('./routes/order.route');
const laptopParts = require('./routes/laptop-parts.route');
const gallery = require('./routes/gallery.route');
const signup = require('./routes/signup.route');

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

app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server is running at http://${app.get('host')}:${app.get('port')}/${app.use('/login', login)}`);
})