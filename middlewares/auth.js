const { getUser } = require("../service/auth");

function restrictToLoggedinUserOnly(req, res, next){
    try {
        const userUid = req.cookies?.uid;

        if(!userUid) {
            console.log('No user cookie found, redirecting to login');
            return res.redirect("/login");
        }

        const user = getUser(userUid);

        if(!user) {
            console.log('Invalid or expired token, redirecting to login');
            return res.redirect("/login");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.redirect("/login");
    }
}

// Middleware to add user data to all views
function addUserToLocals(req, res, next) {
    try {
        const userUid = req.cookies?.uid;
        if (userUid) {
            const user = getUser(userUid);
            if (user) {
                res.locals.user = user;
            }
        }
        next();
    } catch (error) {
        console.error('Error adding user to locals:', error);
        next();
    }
}

module.exports = { restrictToLoggedinUserOnly, addUserToLocals }