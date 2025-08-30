const express = require("express");
const { restrictToLoggedinUserOnly } = require("../middlewares/auth");
const { getusers,getuserbyid } = require("../controllers/internalapi");

const router = express.Router();

// Add authentication middleware to all internal API routes
router.use(restrictToLoggedinUserOnly);

router.get('/api/users', getusers);

router.get('/api/users/:id', getuserbyid);

module.exports = router;