const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

//SignUp
router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(async(req,res)=>{
    try
    {
    let {username,email,password} = req.body;
    const newUser = new User({username, email});
    const registeredUser = await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            next(err);
        }
        req.flash("success","Congratulations ! You are registered");
    res.redirect("/listings");
    });
    
}catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
}
}));

//Login
router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});
router.post("/login",
    saveRedirectUrl,
    passport.authenticate('local',{
        failureRedirect: '/login',
        failureFlash: true
    }),
        wrapAsync(async (req,res)=>{
            req.flash("Welcome to InkPress ! you are logged in");
            let redirectUrl = res.locals.redirecturl || "/listings";
            res.redirect(redirectUrl);
}));

//Logout
router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You Are Successfully Logout");
        res.redirect("/listings");
    });
});

module.exports = router;

