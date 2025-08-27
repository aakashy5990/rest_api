const express = require('express');
const { handleUserSignup, handleUserlogin, handlergetLogin, handlergetSignup } = require('../controllers/user');

const router = express.Router();

router.get('/login', handlergetLogin)
router.get('/signup', handlergetSignup)
router.post('/login', handleUserlogin)
router.post('/signup', handleUserSignup)

module.exports = router;
