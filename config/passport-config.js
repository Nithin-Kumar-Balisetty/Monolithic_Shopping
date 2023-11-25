const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../db_models/user');

passport.use(new LocalStrategy(
  async (username, password, done) => {
    const user = await User.findOne({username,password });
    if (!user) 
      return done(null, false, { message: 'Incorrect username or password'});
    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

module.exports = passport;
