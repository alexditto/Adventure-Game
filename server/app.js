const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');

const app = express();

//mongoDB connection via mongoose
mongoose.connect("mongodb://localhost:27017/adventureGame", { userUnifiedTopology: true, useNewUrlParser: true }).then(()=> console.log('Mongo is Connected'));
var db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error:'));

//use sessions for tracking logins
app.use(session({
  secret: "The Secret door requires a perception of 15.",
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

//User Id
app.use((req, res, next)=> {
  res.locals.currentUser = req.session.userId;
  next();
});

//Parse incoming requests and cookie
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//View engine and PUG
app.set('view engine', 'pug');
app.set('views'. __dirname+'views');

// static files from /public
app.use(express.static(__dirname + '/public'));

//routes
const routes = require('./routes/index');
app.use('/', routes);


//404 catch and forward to error handler
app.use((req, res, next) =>{
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000, ()=>{
  console.log(`The game is running, Dungeon Master.`)
});
