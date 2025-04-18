const User = require("../models/user.js");

module.exports.rendersignupform = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup = async(req,res)=>{
    try{
    let {username,email,password} = req.body;
    const newUser = new User({email,username});
    const registeredUser = await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err) =>{
        if(err){
        return next(err); //here if we don't use return then success message might get printed even after the error has occured
        }
        req.flash("success","Welcome to Wanderlust");
        res.redirect("/listings");
    })
   
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
}

module.exports.renderloginform = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust ");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  };


module.exports.logout = (req,res,next) =>{
    /*req.logout method takes call back as an parameter
    if the user logout from the page then if error occurs then 
    error will get store inside the parameter err and if the error 
    is empty then the error will be empty and undefined  */
    req.logout((err) =>{
        if(err) {
           return  next(err);
        }
        req.flash("success","you are logged out now");
        res.redirect("/listings");
    })
}