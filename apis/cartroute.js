const express = require("express");
const app = express.Router();

const Cart = require('../db_models/cart');

app.get('/',async (req,res)=>{
    if(!req.isAuthenticated())
        res.redirect('/login');
    else{
        const cart = await Cart.findOne({username : req.user.username});
        res.render('cart',{cart});
    }
})

app.delete('/',async (req,res)=>{
    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { username: req.user.username },
            { $pull: { items: { id: req.body.id } } },
            { new: true }
            );
    
        if (updatedCart) {
            res.json({
                Status : 200,
                message : 'Removed from Cart'
            });
        } else {
            console.log(`User with username '${req.user.username}' not found.`);
            res.json({
                Status : 404,
                message : 'Server Error'
            })
        }
      } catch (error) {
        console.error('Error updating cart:', error);
        res.json({
            Status : 404,
            message : 'Server Error'
        });
      }
})


module.exports = app;