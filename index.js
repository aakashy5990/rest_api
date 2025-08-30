const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cookieParser = require('cookie-parser');
const { restrictToLoggedinUserOnly } = require("./middlewares/auth");
const { getUser } = require("./service/auth");
// import maintenance middleware
const { maintenanceMiddleware } = require("./middlewares/maintenanceMiddleware");

// Load environment variables from .env file
require('dotenv').config();

let users = require('./MOCK_DATA.json');

const userRoute = require('./routes/user');
const staticRoute = require('./routes/staticRoutes');
const externalapi = require('./routes/externalapi');
const internalapi = require('./routes/internalapi');
const express = require("express");

const app = express();

// Set view engine
app.set('view engine', 'ejs');

// MAINTENANCE FIRST
app.use(maintenanceMiddleware);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to parse form POST data
app.use(cookieParser());
// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'public', 'uploads');
try { fs.mkdirSync(uploadsDir, { recursive: true }); } catch (e) {}
app.use(express.static('public'));

// Expose authenticated user to all views
app.use((req, res, next) => {
    try {
        const token = req.cookies?.uid;
        res.locals.user = token ? getUser(token) : null;
    } catch (err) {
        res.locals.user = null;
    }
    next();
});

// Use environment variables
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI;

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to DB");

    const users = await User.find({});

    for (let user of users) {
      // Skip already hashed passwords
      if (!user.password.startsWith("$2b$")) {
        const hashed = await bcrypt.hash(user.password, 12);
        user.password = hashed;
        await user.save();
        console.log(`Hashed password for: ${user.username}`);
      }
    }

    console.log("✅ Done hashing passwords");
  })
  .catch(err => console.error(err));
  
app.use(staticRoute);
app.use('/api', internalapi);
app.use(userRoute);
app.use('/external', externalapi);


app.get("/users", (req,res) => {
    // return res.json(userdata);
    return res.json(users);
})

app.route("/api/users/:id").put((req,res) => {
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