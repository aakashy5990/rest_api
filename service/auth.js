const jwt = require("jsonwebtoken");
require('dotenv').config();

function setUser(user){
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('JWT verification error:', error.message);
        return null;
    }
}

module.exports = { setUser, getUser };
