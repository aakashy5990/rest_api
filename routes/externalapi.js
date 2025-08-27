const express = require("express");

const { getnusers } = require("../controllers/externalapi");

const router = express.Router();

router.get('/nusers', getnusers)

module.exports = router;