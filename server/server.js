//FRAMEWORK CONFIGURATION
const express = require("express");
const connectDb=require("./config/dbConnection");
const errorHandler=require("./middleware/errorHandler");
const cors=require("cors");
const hbs=require("hbs");
const path=require("path");
const multer=require('multer');
const upload=multer({dest:'uploads/'});

hbs.registerPartials(__dirname+'/views/partials',function(err) {});

//env file config
const dotenv =require("dotenv");
dotenv.config();

connectDb();
const app=express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

//Route for user registration and Authentication
app.use("/api/register",require("./routes/userRoutes"));


//error handling middleware
app.use(errorHandler);


app.set('view engine', 'hbs');

//ROUTES BELOW
app.get('/',(req,res)=>{
    res.send("Working");
});
app.get("/home",(req,res)=>{
    res.render("home",{username: 'Palak'})
})

app.get("/allusers",(req,res)=>{
    res.render("users",{
        usersp :[
            {id:1,username:"abc",age:18},
            {id:1,username:"xyz",age:19}
        ]
    })
})
app.post('/profile', upload.single('avatar'), function (req, res, next) {

    console.log(req.body);
    console.log(req.file);
    return res.redirect("/home");
    // req.file is the avatar file
    // req.body will hold the text fields, if there were any
  })
//APP CONFIG START
app.listen(port,()=>{
    console.log(`Server running on port http://localhost:${port}`);
})