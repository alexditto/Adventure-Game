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
  Character.find({account: req.session.userId}, function(err, character){
    res.redirect('/profile/'+ req.session.userId);
  });
  // return res.render("profile", { title: "Profile "});
});

router.get('/profile/:userId', (req, res, next)=> {
  var json= Character.find({ account: req.session.userId });
  // [{id:1, name:req.session.userId}];
  res.render("profile", { title: "Profile", json});
});

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

//DELETE character


//GET game
router.get('/game', mid.requiresLogin, (req, res, next)=> {
    return res.render('game', { title: "Game"});
});

//GET game by Character
router.get('/game/:id', (req, res, next)=> {
  Character.find({_id: req.params.id}, function(err, character) {
    // res.send(character)
    return res.render('game', {character});
  });
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

//API
//API to get profile working
router.get('/api/profile/:_id', (req, res, next)=> {
  User.find({_id: req.params._id}, function(err, user) {
    console.log(user);
    res.send(JSON.stringify(user));
  });
});

//API to get character working
router.get('/api/:character', (req, res, next)=>{
  Character.find({_id: req.params.character}, function(err, character) {
    console.log(character);
    res.send(JSON.stringify(character));
  });
});

router.get('/api/character/:id', (req, res, next)=>{
  Character.find({account: req.params.id}, function(err, character) {
    console.log(character);
    res.send(JSON.stringify(character));
  });
});

//API to delete character working
router.delete('/api/delete/character/:id', function(req, res, next) {
  // Character.findOneAndRemoveAsync(req.params.id)
  //   .then(function() {
  //     res.status(204).end();
  //   })
  //   .catch(function(err){
  //     return res.status(500).send(err);
  //   })
  const id = req.params.id;
  Character.deleteOne({ _id : id })
    .exec()
    .then( result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error:err
      })
    })
});

//API to delete Profile working
router.delete('/api/delete/profile/:id', function(req, res, next) {
  const id = req.params.id;
  User.deleteOne({ _id : id })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error:err
        })
      })
});

//API to put character working by object through postman
// router.patch('/api/patch/character/:id', (req, res, next)=> {
//   const id = req.params.id;
//   console.log(req.body);
//   const updateStats = {};
//   for (const stats of req.body) {
//     updateStats[stats.propName] = stats.value;
//   }
//
//   Character.update({ _id:id}, {$set: updateStats })
//             .exec()
//             .then(result=> {
//               res.status(200).json(result);
//             })
//             .catch(err => {
//               console.log(err);
//               res.status(500).json({
//                 error:err
//               });
//             })
// })
router.patch('/api/patch/character/:id', (req, res, next)=> {
  const id = req.params.id;
  let newStats = {
    _id: req.params.id,
    playerLevel: req.body.playerLevel,
    playerXp: req.body.playerXp,
    playerHealth: req.body.playerHealth,
    playerAC: req.body.playerAC,
    healthPotions: req.body.healthPotions,
    playerAttackBonus: req.body.playerAttackBonus,
    playerAttackDie: req.body.playerAttackDie,
    playerDamageMod: req.body.playerDamageMod,
    win: req.body.win,
    loss: req.body.loss,
    gold: req.body.gold
  }
  console.log(newStats);

  Character.updateOne({_id: req.params.id}, {
    playerLevel: newStats.playerLevel,
    playerXp: newStats.playerXp,
    playerHealth: newStats.playerHealth,
    playerAC: newStats.playerAC,
    healthPotions: newStats.healthPotions,
    playerAttackBonus: newStats.playerAttackBonus,
    playerAttackDie: newStats.playerAttackDie,
    playerDamageMod: newStats.playerDamageMod,
    win: newStats.win,
    loss: newStats.loss,
    gold: newStats.gold
  } )
            .exec()
            .then(result=> {
              res.status(200).json(result);
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error:err
              });
            })
})




//starting over with put, not working
// router.put('/api/:character', (req, res, next)=> {
//   let newStats = {
//     playerLevel: req.params.playerLevel,
//     playerXp: req.params.playerXp,
//     playerHealth: req.params.playerHealth,
//     playerAC: req.params.playerAC,
//     healthPotions: req.params.healthPotions,
//     playerAttackBonus: req.params.playerAttackBonus,
//     playerAttackDie: req.params.playerAttackDie,
//     playerDamageMod: req.params.playerDamageMod,
//     win: req.params.win,
//     loss: req.params.loss,
//     gold: req.params.gold
//   }
//   Character.updateOne({character: req.params.character}, newStats, function(err, character) {
//     if (err) throw err;
//     console.log("Updated");
//   });
// });



router.get('/character/:character', (req, res)=> {
  // Character.find({_id: req.params._id}, function(err, character) {
  //   res.send(character);
  Character.find({character: req.params.character}, function(err, character) {
    console.log(character);
    res.render('rules', {character});
  });
});


module.exports = router;
