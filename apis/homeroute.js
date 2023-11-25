const express = require("express");
const app = express.Router();


const Cart = require('../db_models/cart');
const Product = require('../db_models/product'); // Adjust the path based on your project structure


app.get('/',async (req,res)=>{
    try{
        let pr_items = [];
        const products = await Product.find();
        if(req.isAuthenticated()){
            const cart = await Cart.findOne({username : req.user.username});
            for(let j=0;j<products.length;j++){
                let temp = {
                    _id : products[j]['_id'],
                    title : products[j]['title'],
                    price : products[j]['price'],
                    rating : products[j]['rating'],
                    cart : false
                }
                for(let i=0;i<cart['items'].length;i++){
                    if(cart['items'][i].id === products[j]._id.toString()){
                        temp['cart'] = true;
                    }
                }
                pr_items.push(temp);
            }
            res.status(200).render('index',{products : pr_items,username : req.user.username});
        }
        else{
           for(let j=0;j<products.length;j++){
                let temp = {
                    _id : products[j]['_id'],
                    title : products[j]['title'],
                    price : products[j]['price'],
                    rating : products[j]['rating'],
                    cart : false
                }
                pr_items.push(temp);
            }
            
            res.status(200).render('index',{products : pr_items, username : null});
        }
    }
    catch(er){
        console.error('Error getting products:', er);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.put('/',async (req,res)=>{
    try {
        if(req.isAuthenticated()){
            const pitem = await Product.findById(req.body.id);
            const updatedCart = await Cart.findOneAndUpdate(
            { username: req.user.username },
            { $push: { items: {
                id : req.body.id,
                title : pitem.title,
                price : pitem.price,
                rating : pitem.rating 
            } } },
            { new: true } // Return the modified document rather than the original
            );
        
            if (updatedCart) {
                res.json({
                    Status : 200,
                    message : 'Added to Cart'
                });
            } else {
                console.log(`User with username '${req.user.username}' not found.`);
                res.json({
                    Status : 404,
                    message : 'Server Error'
                })
            }
        }
        else{
            res.json({
                Status : 404,
                message : 'Not Logged In'
            })
        }
      } catch (error) {
        console.error('Error updating cart:', error);
        res.json({
            Status : 404,
            message : 'Server Error'
        });
      }
});

app.get('/logout', (req, res) => {
    if(req.isAuthenticated())
      req.logout((err)=>{
      if(err) next(err);
      res.redirect('/')
    });
    else
      res.redirect('/');
});

module.exports = app;