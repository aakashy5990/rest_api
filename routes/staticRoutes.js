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
//     next();
// }

router.get('/', (req,res) =>{
    return res.render("index",{title:"welcome to the page"});
})

module.exports = router;