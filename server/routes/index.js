const express = require('express');
const router = express.Router();
const user = require('../models/user');
const mid = require('../middleware');

//GET /profile

//GET /login
router.get('/login', mid.loggedOut, (req, res, next)=> {
  return res.render("login", { title: "Log In" });
});

//POST /login
router.post("/login", (req, res, next)=> {
  if(req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function(error, user){
      if (error || !user){
        var err = new Error("Wrong email or password.")
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error("Email and password are required.");
    err.status = 401;
    return next(err);
  }
});

//GET /logout

//GET /register
router.get("/register", mid.loggedOut, (req, res, next)=> {
  return res.render('register', { title: "Sign Up" });
});

//POST /register
router.post("/register", (req, res, next)=> {
  if(req.body.email &&
  req.body.name &&
  req.body.password &&
  req.body.confirmPassword){

//confirm passwords
    if(req.body.password !== req.body.confirmPassword){
      var err= new Error("Passwords do not match.");
      err.status = 400;
      return next(err);
    }

    // create object with form input
    var userData = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    }

    //use schema to insert data to mongo
    User.create(userData, function(error, user){
      if(error){
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  } else {
    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
});

//POST new character

//GET character

//PUT character

//DELETE charachter


//GET /
router.get('/', (req, res, next)=> {
  return res.render('index', { title: "Home"});
});
//!!!! Fix based on pug layouts

//GET /about
router.get('/about', (req, res, next)=> {
  return res.render('about', { title: "About"});
})

//GET /rules
router.get('/rules', (req, res, next)=> {
  return res.render('rules', { title: "Rules"});
})

module.exports = router;
