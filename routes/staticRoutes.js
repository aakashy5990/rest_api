const express = require("express");

const router = express.Router();

// router.get('/signup', (req, res) => {
//     return res.render("signup");
// });

// router.get('/login', (req, res) => {
//     return res.render("login");
// });

// const mymiddleware = (req,res,next) => {
//     const d = new Date();
//     console.log(`Time : ${d.getHours()} and ${d.getTime()}`);
// });

router.get('/', (req,res) =>{
    // If logged in, show dashboard; otherwise show home
    if (res.locals.user) {
        return res.render("dashboard",{title:"Dashboard", user: res.locals.user});
    }
    return res.render("index",{title:"welcome to the page", user: res.locals.user});
})

// Dashboard route for logged-in users
router.get('/dashboard', (req,res) =>{
    if (!res.locals.user) {
        return res.redirect('/login');
    }
    return res.render("dashboard",{title:"Dashboard", user: res.locals.user});
})

// Documentation route
router.get('/docs', (req,res) =>{
    return res.render("docs",{title:"Documentation", user: res.locals.user});
})

router.get('/logout', (req, res) => {
    res.clearCookie('uid');
    return res.redirect('/');
});

module.exports = router;