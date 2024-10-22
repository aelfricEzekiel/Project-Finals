const express = require('express');
const conn = require('../mysql/conn');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('signup', {
        title: "Sign Up",
    })
})

router.route('/register')
.post(async (req, res) => {
    const {fullName, email, password} = req.body;
    
    const checkUserQuery = "SELECT * FROM signup WHERE fullName = ? AND email = ?";

    conn.query(checkUserQuery, [fullName, email], async (err, result) => {
        if (err) throw err;

        if(result.length > 0) {
            return res.status(400).send(`
                <script>
                    alert("User Already exists");
                    window.location.href = '/signup';
                </script>
                `);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertUserQuery = "INSERT INTO signup (fullName, email, password) VALUES (?, ?, ?)";

        conn.query(insertUserQuery, [fullName, email, hashedPassword], (err, result) => {
            if (err) throw err;

            req.session.user = {
                id: result.id,
                fullName: result.fullName,
                password: result.password
            }
            res.status(200).send(`
                <script>
                    alert("Registered Successfully");
                    window.location.href="/signup";
                </script>
            `);
        })
    })

})
module.exports = router;