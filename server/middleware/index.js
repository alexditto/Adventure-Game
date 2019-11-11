//middleware to limite what pages are viewable
const loggedOut = (req, res, next) =>{
  if (req.session && req.session.userId) {
    return res.redirect('/profile');
  }
  return next();
};

const requiresLogin = (req, res, next) => {
  if (req.session && req.session.userId){
    next();
  }
  var err = new Error("Please log in to see this page.");
  err.status = 401;
  return next(err);
}

module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;
