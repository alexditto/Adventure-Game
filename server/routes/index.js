const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Character = require('../models/character');
const mid = require('../middleware');

//GET /profile
// router.get('/profile', mid.requiresLogin, (req, res, next)=> {
// User.findById(req.session.userId)
//       .exec((error, user)=> {
//         if(error){
//           return next(error);
//         } else {
//           return res.render('profile', { title: 'Profile', name: user.username});
//         }
//       });
// });
router.get('/profile', (req, res, next)=>{
  return res.render("profile", { title: "Profile "});
})

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
router.get('/logout', (req, res, next)=>{
  if (req.session) {
    req.session.destroy((err)=> {
      if (err){
        return next(err);
      } else {
        return res.redirect('/');
      }
    })
  }
});

//GET /register
router.get("/register", mid.loggedOut, (req, res, next)=> {
  return res.render('register', { title: "Sign Up" });
});

//POST /register
router.post("/register", (req, res, next)=> {
  if(req.body.email &&
  req.body.username &&
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
      username: req.body.username,
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

// POST Create a new character
router.post("/profile", (req, res, next)=>{
  let saveData = {
    character: req.body.character,
    account: req.session.userId,
    playerLevel: 1,
    playerXp: 0,
    playerHealth: 15,
    playerAC: 15,
    healthPotions: 3,
    playerAttackBonus: 5,
    playerAttackDie: 6,
    playerDamageMod: 4,
    win: 0,
    loss: 0,
    gold: 0
  }

  Character.create(saveData, function(error, user){
    if(error){
      return next(error);
    } else {
      return res.redirect('/profile');
    }
  });
});

//GET character

//PUT character

//DELETE charachter

//GET game
router.get('/game', (req, res, next)=> {
    return res.render('game', { title: "Game"});
});

//GET /
router.get('/', (req, res, next)=> {
  return res.render('index', { title: "Home"});
});

//GET /about
router.get('/about', (req, res, next)=> {
  return res.render('about', { title: "About"});
});

//GET /rules
router.get('/rules', (req, res, next)=> {
  return res.render('rules', { title: "Rules"});
});

module.exports = router;
