const express = require("express");
const { getusers,getuserbyid } = require("../controllers/internalapi");

const router = express.Router();

router.get('/api/users', getusers);

router.get('/api/users/:id', getuserbyid);

module.exports = router;