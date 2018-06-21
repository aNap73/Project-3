/* Dependencies */

/* Routes */
var path = require("path");
var passport = require("../config/passport");
var db = require("../models");
var siteSendMail = require('../utilities/RegEmail.js');
var emailurltop = 'http://127.0.0.1:3000'
if(process.env.JAWSDB_URL){
  emailurltop = 'https://stark-cliffs-26986.herokuapp.com';
};
console.log('EMAIL URL TOP', emailurltop)


// this is for the filter!
var filter = require('leo-profanity');



module.exports = function (app) {
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect('/');
    });
  app.post("/", function (req, res) {
    console.log("INCOMING COMMENT POST");

    db.contents.create({
      contentType: filter.clean(req.body.type),
      contentText: filter.clean(req.body.text),
      userUserId: req.user.userId
    }).then(function (data) {
      if (!data) {
        console.log("this isnt working");

      } else {
        res.json({
          data
        });
      }
    })
  });

  app.post("/api/postArticle", function (req, res) {
    console.log("INCOMING ARTICLE POST");
    if(!req.user){
      res.json({});
      return;
    }
    db.contents.create({

      contentType: req.body.type,
      contentText:  filter.clean(req.body.text),
      contentTitle: filter.clean(req.body.title),
      userUserId: req.user.userId
    }).then(function (data) {
      if (!data) {
        console.log("this isnt working");

      } else {
        res.json({
          data
        });
      }
    })
  });

  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json({
      route: "/"
    });
  });
  app.post("/api/register/", function (req, res) {
    //IF INCOMING DATA GOOD
    console.log('INCOMING REG REQUEST');
    if (req.body.email && req.body.password) {
      console.log('REGISTER: ', req.body.email);
      //LOOK UP USER BY EMAIL

      db.users.findOne({
        where: {
          email: req.body.email
        }
      }).then(function (data) {
        if (!data) {

          //} 
          //if (data.email.toString()!==req.body.email.toString()) {
          //IF NOT EXISTS
          //GENERATE NEW onBoardId
          let newOnBoardId = Math.floor(Math.random() * 99999);
          //GENERATE NEW USER WITH EMAIL AND onBoardId
          db.users.create({
            email: req.body.email,
            password: req.body.password,
            onBoardId: newOnBoardId,
            userImage: 'https://anap73.github.io/Bootstrap-Portfolio.github.io/assets/images/AntMeHead.png'
          }).then(function (outdata) {
            //SEND EMAIL WIH link to should be set to .get <ourpage>/finalizeRegistration/email:/onBoardId:    
            console.log('will this work');
            siteSendMail(emailurltop, req.body.email, newOnBoardId);
            //INDICATE SUCCESS
            res.json({
              route: "/register/success"
            });
          });
        } else {
          console.log('USER NOT FOUND')
          if (!data.hasEmailConfirmed) {
            res.json({
              route: "/register/founduser"
            });
          } else {
            console.log('data.onBoardId should be populated: ', data.onBoardId);
            console.log('data.email should be populated: ', data.email);
            //

            siteSendMail(emailurltop, req.body.email, newOnBoardId);
            res.json({
              route: "/register/success"
            });
          }

        }
      });
    } else {
      res.json({
        route: "/register/fail"
      });
    }
  });

  /* Post Route for new post/articles */
  app.post("/api/posts", function (req, res) {
    if (req.user) {
      db.contents.create({
        contentId: req.body.contentId,
        contentType: "COMENT",
        contentText: filter.clean(req.body.contentText),
        contentImage: filter.clean(req.body.contentImage),
        contentTitle: filter.clean(req.body.contentTitle),
        userUserId: req.user.userId
      }).then(function (newPost) {
        res.json(newPost);
      });
    }
  });

  /* Get route for getting all posts */
  app.get("/api/get/posts/", function (req, res) {
     db.contents.findAll({
      where: {
        contentType: "COMMENT"
      }
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  /* Get route for getting all articles */
  app.get("/api/get/articles", function (req, res) {
  
    db.contents.findAll({
      where: {
        contentType: "ARTICLE"
      }
    }).then(function (dbArticle) {
      res.json(dbArticle);
    });
  });

  /* Get route for getting all users */
  app.get("/api/get/users", function (req, res) {
    db.users.findAll({}).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

  /* Delete route for deleting content */
  app.delete("/api/delete/content/:id" , function(req,res){
    db.contents.destroy({
      where: {
        contentId: req.params.id
      }
    }).then(function (dbContent){
      res.json(dbContent);
    });
  });
  /* Put route to ban a user */
  app.put("/api/put/users/:id" , function(req,res){
    db.users.update(
      { 
        hasBan: true
      }, {
        where: {
          userId: req.params.id
        }
      }
    ).then(function(banUser){
      res.json(banUser);
    });
  });


}