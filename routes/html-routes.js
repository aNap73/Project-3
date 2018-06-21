/* Holds all the routes for the html pages */
// var isAuthenticated = require("../config/middleware/isAuthenticated");

/* Bring in dependencies */
var path = require("path");

var passport = require("../config/passport");
var db = require("../models");

/* Routes */
module.exports = function (app) {
   app.get("/autologin/:autoid/:email", function(req,res){
    
    let pageData = {
      happyMonkeys: 'Bill'
    };
    if(req.params.autoid&&req.params.email){
      console.log('AUTOLOG',req.params.autoid,req.params.email)
      db.users.findOne({
        where: {
          email: req.params.email
        }
      }).then(function(data){

         if(data.onBoardId.toString()===req.params.autoid.toString()){
          data.update(
            { hasEmailConfirmed: true,
              hasAcceptedTerms: true,
              onBoardId: null },
            { where:{email: req.params.email}}
          ).then(function(data){
            
            
            req.login(data.email, function(err) {

              // let pageData = {
              //   regInit: {
              //     value: true
              //   }
              // };
              // pageData.happyMonkeys = 'Bill Logged in';
              // pageData.name = data.email;
              // pageData.userObj = data;
              // res.render("index", pageData);
              // return;
              return res.redirect("/");  
            });
          });
         }
      });
    } 
    
    
   });
   app.get("/register", function (req, res) {

    let pageData = {
      regInit: {
        value: true
      }
    };
    res.render("register", pageData);
  });
  app.get("/register/:regCode/", function (req, res) {

    let pageData = {};
    if (req.params.regCode) {
      switch (req.params.regCode) {
        case 'success':
          pageData.regSuccess = {
            value: true
          };
          res.render("register", pageData);
          break;
        case 'founduser':
          pageData.regFail = {
            value: true
          };
          pageData.regFoundUser = {
            value: true
          };
          res.render("register", pageData);
          break;
        case 'fail':
          pageData.regFail = {
            value: true
          };
          res.render("register", pageData);
          break;

        default:
          
          //check 4 email
          if (req.query.emailaddy) {

            //get user record
            db.users.findOne({
              where: {
                email: req.query.emailaddy
              }
            }).then(function (data) {
              if (data) {
                //if code matches update user record to hasEmailValidated  
                if (data.onBoardId.toString() === req.params.regCode.toString()) {
                  data.update(
                    { hasEmailConfirmed: true },
                    { where:{email: data.email}}
                  ).then(function(data){
                    let pageData2 = {
                      email: req.query.emailaddy,
                      autosecid: req.params.regCode  
                    };                    
                   
                    res.render("eula", pageData2);
                    return;
                  });
                  } else {
                    pageData.regFail = {
                      value: true
                    };
                    res.render("register", pageData);
                    return;
                  };
                } else {
                pageData.regFail = {
                  value: true
                };
                res.render("register", pageData);
                return;
              }
            })
          } else {
            res.render("register", pageData);
            return;
          }
          
      }
    }
  });
  
  app.get("/login", function (req, res) {
    
    let pageData = {};
    res.render("logintmp", pageData);
  });

  /* Admin Site route */
  app.get("/admin", function (req, res) {
    let pageData = {};
    if (req.user) {
      pageData = {
        name: req.user.email,
        userObj: req.user,
        happyMonkeys: 'Bill'
      };
      if (req.user.hasAdmin) {
        res.render("admin", pageData);
      } else {
        res.render("index", pageData);
      };
    } else {
      res.render("index", pageData);
    }
  });

  app.get("/postArticle", function (req, res) {
    if (req.user) {
      pageData = {
        name: req.user.email,
        userObj: req.user,
        happyMonkeys: 'Bill'
      };}
    res.render("postArticle", pageData)
  });
  /* Homepage route */
  app.get("*", function (req, res) {
    if(req.user){ console.log('REQ.USER', req.user);}
   
    let pageData = {};
    let commentData = {};
  
    db.contents.findAll({
      where: {
        contentType: "ARTICLE"
      },
      include: [{
        model: db.users,
          required: false
      }],
        order: [['createdAt', 'DESC']]
    }).then(function (data) {
      
      for (var i = 0; i < data.length; i++) {
        if (data[i].contentType === "ARTICLE") {
          var testText = data[i].contentText;
          var testTit = data[i].contentTitle;
          var type = data[i].contentType;
        }
        
      }
      

      pageData = [{
        mainArticle: data,

        contentType: type,

        contentTitle: testTit,

        contentText: testText
      }];

    
      if (req.user) {

        pageData = [{
          mainArticle: data,

          contentType: type,

          contentTitle: testTit,

          contentText: testText

        }];


        //pageData[0].name = req.user.email;
        pageData[0].userObj = req.user;
      }



      db.contents.findAll({
        where: {
          contentType: "COMMENT"
        },
        include: [{
          model: db.users,
            required: false
        }],        
      order: [
        ['createdAt', 'DESC']
      ]
      }).then(function (outData) {
        if (outData) {         
          for (var i = 0; i < outData.length; i++) {
          var commentText = outData[i].contentText;
          }
           
           
          commentData = [{
            commentsNum: outData,
            comments: commentText

                   
          }];
          
          
           
          let myuser = req.user; 
                
                    
          //console.log('req.user.email',req.user.email)));
          if(myuser){
            console.log('FOUND REQ.USER', myuser);
            if(!myuser.email){
              console.log('REQ.USER.EMAIL NOT FOUND', req.user);
              myuser = {};
              
              myuser.email = req.user;
              console.log('MYUSER', myuser);
            }
            
          }
          res.render("index", {
            articles: pageData,
            commentsObj: commentData,
            userObj: myuser
            
          });

          // res.json(pageData);
        }}
      )
    })



  });



}