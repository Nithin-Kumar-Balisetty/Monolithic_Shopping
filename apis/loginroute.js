const express = require("express");
const app = express.Router();

const passport = require('../config/passport-config');

app.get('/',async (req,res)=>{
    if(!req.isAuthenticated()){
        if(req.flash('Creation').length!==0)
            res.render('login.ejs',{message : req.flash('Creation')});            
        else
            res.render('login.ejs',{message : req.flash('error')});
    }
    else
        res.redirect('/');
})

app.post('/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

module.exports = app;