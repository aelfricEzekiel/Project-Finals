const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'weit'
})

conn.connect((err) => {
    if(err) throw err;

    console.log(`Server is running`);
})

module.exports = conn;