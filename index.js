const { getData } = require("./api");

// Load environment variables from .env file
require('dotenv').config();

const users = require('./MOCK_DATA.json');

const express = require("express");

const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Use environment variables
const PORT = process.env.PORT || 3000;


app.get("/nusers", async (req,res) =>{
    try{
        const data  = await getData();
        // return res.json(data);
        return res.render("nextapi",{data});
    }
    catch(error){
        console.log(error);
    }
})

app.get("/users", (req,res) =>{
    // return res.json(userdata);
    return res.json(users);
})


app.get("/api/users", (req,res) =>{
    return res.render('home',{users});
})

app.route("/api/users/:id").get((req,res) =>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    return res.render('userid',{user});
}).put((req,res) => {
    // edit user with id 
    res.json({status:"Pending"});
}).delete((req,res)=>{
    // delete the user 
    return res.json({status:"pending"});
})



// app.get("/api/users/:id",)

app.post("/api/users",(req,res)=>{
    // add the user 
    return res.json({status:"pending"});
})


app.listen(PORT, () =>{
    console.log(`http://localhost:${PORT}`);
})