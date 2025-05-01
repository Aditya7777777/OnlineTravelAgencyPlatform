//This is the development phase of the project so we are writing the following logic that this dot.env will only work 
//when it is in development phase not in the production phase. We should not upload the .env file when we upload our 
//project or deploy because it contains important credentials . 

if(process.env.NODE_ENV != "production"){
    //Here NODE_ENV is the variable which meaning is node Environment. When we deploy the project we can set it's 
    //value to production.
    require('dotenv').config(); //install dotenv package to import .env file to backend
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path  = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");



const reviewsRouter = require("./routes/review.js");
const listingsRouter = require("./routes/listing.js");
const userRouter = require("./routes/user.js");
const { serialize } = require("v8");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() =>{
    console.log("Connected to DB");
})
.catch((err) =>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine",'ejs');
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));//we are using this line of code so that whatever line of code which is present inside the request body will get parse
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static( path.join(__dirname,"/public")));// method to use the static file given below


const sessionOption = {
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly:true, // to prevent cross-scripting attacks we set httpOnly to true
    }
};


app.get("/",(req,res)=>{
    res.send("Hi,I am root");
});
// If we want to authenticate the user we can also do it from the scratch 
// but with the help of passport we can authenticate the user  within 7 lines of code 
app.use(session(sessionOption));
app.use(flash()); //flash will come before the routes 

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// serialize -> the meaning of serialize is that whtever information of the user we storing in the session is known as serialize.
// deserialize -> whatever information related to the user we unstore from the session is called deserialize.     



//NOTE: The below middleware function is used in Express.js application to make certain variables
//       available in all views (templates) rendered by the application.this is achieved by using
//       a property of res object res.local
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


// app.get("/demouser",async(req,res)=>{
//     let fakeUser = new User({
//         email:"Student@gmail.com",
//         username:"delta-student"
//     });

//     const registeredUser = await User.register(fakeUser,"helloworld");
//     res.send(registeredUser);
// })


app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);





app.all("*",(req,res,next) =>{
    next(new ExpressError(404,"Page not found!"));
})

app.use((err,req,res,next) =>{
    let {statusCode =500,message = "Something went wrong!!!"} = err; 
    res.status(statusCode).render("error.ejs",{err});
})
app.listen(8080,() =>{
    console.log("server is listening to port 8080");
});





