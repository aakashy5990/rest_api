const express = require("express");
const { restrictToLoggedinUserOnly } = require("../middlewares/auth");
const { getnusers } = require("../controllers/externalapi");

const router = express.Router();

// Add authentication middleware to all external API routes
router.use(restrictToLoggedinUserOnly);

// Route to render the external API page
router.get('/', (req, res) => {
    return res.render("nextapi", { data: [] });
});

router.get('/nusers', getnusers)

module.exports = router;