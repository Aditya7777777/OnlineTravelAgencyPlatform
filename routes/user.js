const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require('../middleware');
const userControllers = require('../controllers/users.js');


router
    .route("/signup")
    .get(userControllers.rendersignupform)
    .post(wrapAsync(userControllers.signup));



router
    .route("/login")
    .get(userControllers.renderloginform)
    .post(
        saveRedirectUrl,
        passport.authenticate("local",
        {failureRedirect: '/login', 
        failureFlash:true }),
        userControllers.login);


router.get("/logout",userControllers.logout);



module.exports = router;
