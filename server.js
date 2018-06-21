//Please add a .env file with your DBPWD; thx ant

// IMPORTING & SERVICE SETUP

var exphbs = require("express-handlebars");
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 3000;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
//app.use(session({ secret: "baseball bat cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

/* Setup express-handlebars */
app.engine("handlebars" , exphbs({ defaultLayout: "main" }));
app.set("view engine" , "handlebars");
// IMPORTING & SERVICE SETUP

// ROUTES / CONTROLLERS
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
// ROUTES / CONTROLLERS




/* Sync database and listen remember to remove the force true when pushing to production */
db.sequelize.sync({}).then(function(){
  app.listen(PORT , function(){
    // //AAN 2018/05/16 this function adds me as a test record and tests the password hash.
    // //DB LIVE INSERT TEST DATA HERE
    //  db.users.create({
    //    email:'napolitano.anthony@yahoo.com',
    //    password:'password123',
    //    onBoardId:1,
    //    hasAdmin:1,
    //    userImage:'https://anap73.github.io/Bootstrap-Portfolio.github.io/assets/images/AntMeHead.png'
    //    }).then(function(outdata){
    //      let today = new Date();
    //      let threemonthsfromnow = today + 90;
    //      db.contents.create({
    //        contentType:'ARTICLE',
    //        contentImage: 'https://media.giphy.com/media/dchERAZ73GvOE/giphy.gif',
    //        contentTitle: 'The Raging Funk Monkey',
    //        contentText: 'I love the Raging Monkey because he is funky and a monkey. This makes for many happy monkey funky moments. One day I was sitting alone in my bedroom and the raging monkey assault me. Would do again!',
    //        liveFrom: today,
    //        liveUntil: threemonthsfromnow,
    //        live: true,
    //        upvote: 0,
    //        downvote: 0,
    //        updatedAt: today,	
    //        createdAt:today}).then(function(outdata){
           
          console.log("App listening at http://localhost:" + PORT);
            
           });
        
      });
      
    
  //});
//})


