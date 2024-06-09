// const express = require('express');
// const mongoose = require('mongoose');
// const path = require('path');
// const port = 3019;

// const app = express();
// app.use(express.static(__dirname));
// app.use(express.urlencoded({ extended: true }));

// mongoose.connect("mongodb://127.0.0.1:27017/LOGIN_INFO")
// const db = mongoose.connection
// db.once("open",()=>{
//     console.log("Mongodb Connected Successfull")
// })

// const userschema = new mongoose.Schema({
//     username: String,
//     password: String,
//     person: String
// });

// const Users = mongoose.model("data", userschema);

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, "login.html"));
// });

// app.post("/login", async (req, res) => {
//     try {
//         const { username, password, person } = req.body;
//         const user = new Users({
//             username,
//             password,
//             person
//         });
//         await user.save();
//         console.log(user);
//         res.redirect("home.html");
//     } catch (err) {
//         console.error("Error Saving User: ", err);
//         res.status(500).send("Error Saving User");
//     }
// });

// app.listen(port, () => {
//     console.log("Server started on localhost for landing page login signup:", port);
// });




const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3666;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/USER_INFO")
const db = mongoose.connection
db.once("open",()=>{
    console.log("Mongodb Connected Successfull")
})

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: Number,
    category: String
});

const Users = mongoose.model("data", userSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, "signup.html"));
});

app.post("/login", async (req, res) => {
    try {
        const { username, password, person } = req.body;
        const user = await Users.findOne({ username, password});
        if (user) {
            res.redirect("landingpage.html");
        } else {
            alert("Invalid User Details");
        }
    } catch (err) {
        console.error("Error logging in user: ", err);
        res.status(500).send("Error logging in user");
    }
});

app.post("/signup", async (req, res) => {
    try {
        const { username, email, phone, category, password } = req.body;
        const user = new Users({
            username, 
            email, 
            phone, 
            category, 
            password
        });
        await user.save();
        res.redirect("landingpage.html"); 
    } catch (err) {
        console.error("Error Saving in user: ",err);
        res.status(500).send("Error logging in user");
    }
});


app.listen(port,()=>{
    console.log("Server started in :",port);
})