const express = require('express');
const conn = require('../mysql/conn');
const bcrypt = require('bcrypt');
const session = require('express-session');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', {
        title: "Login"
    })
})

router.post('/index', (req, res) => {
    const {email, password} = req.body;

    const userCheckQuery = "SELECT * FROM signup WHERE email = ?";

    conn.query(userCheckQuery, [email], async (err, result) => {
        if (err) throw err;

        if(result.length === 0){
            return res.status(400).send(`
                <script>
                    alert("User does not exist");
                    window.location.href = '/login';
                </script>
            `);
        }

        const user = result[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return res.status(400).send(`
                <script>
                    alert("Invalid Password");
                    window.location.href="/login";
                </script>    
            `)
        }

        req.session.user = {
            id: user.id,
            email: user.email,
            password: user.password
        }

        return res.status(200).send(`
            <script>
                alert("Logged in Successfully");
                window.location.href="/";
            </script>
        `);
    })
})

module.exports = router;