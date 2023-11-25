const express = require("express");
const app = express.Router();

const User = require('../db_models/user');
const Cart = require('../db_models/cart');

app.get('/',(req,res)=>{
    if(req.isAuthenticated())
        res.redirect('/');
    else
        res.render('signin',{message : req.flash('validation')});
})

let validation = async (req,res,next)=>{
    let {username,password,cpassword} = req.body;
    if(password !== cpassword){
        req.flash('validation', 'Both passwords do not match');
        res.redirect('/signin');
    }
    if(username.length<3){
        req.flash('validation', 'Username should have alteast 3 characters');
        res.redirect('/signin');
    }
    if(password.length<5){
        req.flash('validation', 'Password should have atleast 5 characters');
        res.redirect('/signin');
    }
    let user = await User.findOne({username : username});
    if(user){
        req.flash('validation', 'Account with this username already exists');
        res.redirect('/signin');
    }
    else
        next();
}

app.post('/',validation,async (req,res)=>{
    try{
        await (new User({username : req.body.username,password : req.body.password})).save();
        await (new Cart({
            username: req.body.username,
            items: [
            ]
          })).save();
        req.flash('Creation','Account created. Login with the same credentials');
        res.redirect('/login');
    }
    catch(er){
        console.error(er);
        req.flash('validation','Issue from server side');
        res.redirect('/signin');
    }
});

module.exports = app;