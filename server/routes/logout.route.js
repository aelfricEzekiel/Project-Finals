const express = require('express');
const router = express.Router();

const isAuth = (req, res, next) => {
    if(req.session.user){
        next();
    } else {
        res.redirect('/login');
    }
}

router.get('/', isAuth, (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;

        return res.status(200).send(`
            <script>
                alert("Logout");
                window.location.href="/login";
            </script>
        `)
    })
})

module.exports = router