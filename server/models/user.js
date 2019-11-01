const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  character: {
    type: Array,
    required: false
  }
});

//authenticate input against database
userSchema.statics.authenticate = (email, password, callback)=> {
  User.findOne({ email: email })
      .exec((error, user)=>{
        if (error) {
          return callback(error);
        } else if ( !user ) {
          var err = new Error("User not found.");
          return callback(err);
        }
        bcrypt.compare(password, user.password, (error, result)=>{
          if(result === true) {
            return callback(null, user)
          } else {
            return callback();
          }
        })
      });
}

//salt and hash
userSchema.pre("save", function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if(err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

var User = mongoose.model("User", userSchema);
module.exports = User;
