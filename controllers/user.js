const User = require("../models/user");
const { v4 : uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignup(req,res){
    try{
        const { username, email, password } = req.body;

        if(!username || !email || !password){
            return res.status(400).render("signup",{ error:"All fields are required"});
        }

        const existing = await User.findOne({ $or: [{ username }, { email }] });
        if(existing){
            return res.status(400).render("signup",{ error:"Username or email already exists"});
        }

        await User.create({
            username,
            email,
            password,
        });

        return res.redirect("/");
    }catch(err){
        console.error("Signup error", err);
        return res.status(500).render("signup",{ error:"Something went wrong. Please try again."});
    }
}

async function handleUserlogin(req,res){
    try{
        const { username, password } = req.body;

        if(!username || !password){
            return res.status(400).render("login",{ error:"Both fields are required"});
        }

        const user = await User.findOne({ username, password });
        if(!user){
            return res.status(400).render("login", {error:"Invalid username or password"});
        }
        // const sessionId = uuidv4();
        // setUser(sessionId, user);
        const token = setUser(user);
        res.cookie("uid",token);
        return res.redirect("/");

    }catch(err){
        console.error("Login error", err);
        return res.status(500).render("login",{ error:"Something went wrong. Please try again."});
    }
}


function handlergetLogin(req, res){
    return res.render("login")
}

function handlergetSignup(req, res){
    return res.render("signup");
}

module.exports = { handleUserSignup, handleUserlogin, handlergetLogin, handlergetSignup };