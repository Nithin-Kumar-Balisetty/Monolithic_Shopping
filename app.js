const express = require('express');
const PORT = 80;

const bodyParser = require('body-parser');

const session = require('express-session');
const flash = require('express-flash');

const passport = require('./config/passport-config');

// DB init
const mongoose = require('./config/db-config');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
});

//Routes configuration
app.use('/',require('./apis/homeroute'));
app.use('/login',require('./apis/loginroute'));
app.use('/signin',require('./apis/signinroute'));
app.use('/cart',require('./apis/cartroute'))