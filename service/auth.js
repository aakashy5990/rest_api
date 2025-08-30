// const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
require('dotenv').config();

function setUser(user){
    const payload = {
        _id : user._id,
        email: user.email,
    };
    return jwt.sign(payload, process.env.secretKey);
}

function getUser(token){
    if(!token) return null;
    try {
        // console.log("jwt returns",jwt.verify(token, process.env.secretKey));
        return jwt.verify(token, process.env.secretKey);
    } catch (error) {
        console.error('JWT verification error:', error.message);
        return null;
    }
}

module.exports = {setUser, getUser};