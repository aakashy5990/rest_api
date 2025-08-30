const { getUser } = require("../service/auth");

function restrictToLoggedinUserOnly(req, res, next){
    try {
        const token = req.cookies?.uid;

        if(!token) {
            console.log('No user cookie found, redirecting to login');
            return res.redirect("/login");
        }

        const user = getUser(token);

        if(!user) {
            console.log('Invalid or expired token, redirecting to login');
            return res.redirect("/login");
        }

        req.user = user; // attach decoded user to request
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.redirect("/login");
    }
}

module.exports = { restrictToLoggedinUserOnly };
