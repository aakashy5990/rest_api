const { getData } = require("./api");
const fs = require("fs");

// Load environment variables from .env file
require('dotenv').config();

let users = require('./MOCK_DATA.json');

const express = require("express");

const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
// adding form data in body 
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Use environment variables
const PORT = process.env.PORT || 3000;


app.get("/nusers", async (req,res) =>{
    try{
        console.log("Fetching data from API...");
        const data  = await getData();
        // console.log("Data received:", data);
        if (!data) {
            console.log("No data received, rendering empty array");
            return res.render("nextapi", { data: [] });
        }
        // return res.json(data);
        return res.render("nextapi",{data});
    }
    catch(error){
        console.log("Error in route:", error);
        return res.render("nextapi", { data: [] });
    }
})


app.get("/",(req,res) =>{
    return res.render("index",{title:"welcome to the page"});
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
    try {
        // edit user with id 
        const id = Number(req.params.id);
        console.log("Updating user with ID:", id);
        
        const userIndex = users.findIndex((user) => user.id === id);
        console.log("User index found:", userIndex);
        
        if (userIndex === -1) {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }
        
        const body = req.body;
        console.log("Request body:", body);
        console.log("Original user:", users[userIndex]);
        
        // Update the user with new data, keeping the original id
        const updatedUser = {
            ...users[userIndex],  // Keep existing data
            ...body,              // Override with new data
            id: id                // Ensure id doesn't change
        };
        
        users[userIndex] = updatedUser;
        console.log("Updated user:", users[userIndex]);
        
        // Write updated data to file
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error("File write error:", err);
                return res.status(500).json({ status: "Error", message: "Error writing file" });
            }
            console.log("File updated successfully");
            return res.json({ 
                status: "Success", 
                message: "User updated successfully",
                user: users[userIndex]
            });
        });
    } catch (error) {
        console.error("PUT request error:", error);
        return res.status(500).json({ status: "Error", message: "Internal server error" });
    }
}).delete((req,res)=>{
    const id = Number(req.params.id);

    const filteredUsers = users.filter(user => user.id !== id);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(filteredUsers, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ status: "Error writing file" });
        }
        // Update the global users array
        users.length = 0;
        users.push(...filteredUsers);
        return res.json({ status: "Success", id });
    });
})



// app.get("/api/users/:id",)

app.post("/api/users",(req,res)=>{
    // add the user 
    const body = req.body;
    // console.log(body);
    // users.push({
    //     id : users.length + 1,
    //     first_name:body.first_name,
    //     last_name:body.last_name,
    //     email:body.email,
    //     gender:body.gender,
    //     job_title:body.job_title
    // })
    // res.redirect("/api/users");
    
    // OR 
    
    users.push({...body,id:users.length+1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) =>{
        // res.redirect("/api/users");
        return res.json({status:"Success",id:users.length});
    });
})


app.listen(PORT, () =>{
    console.log(`http://localhost:${PORT}`);
})