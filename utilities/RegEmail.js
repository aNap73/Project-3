var nodemailer = require('nodemailer');
console.log('SETTING EMAIL UP');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    //user: 'bootcampp53@gmail.com',
    //pass: 'pass@word1'
    user: 'GameBlog911@gmail.com',
    pass: 'B@@B@@B0033'
   }
});

function SendRegMail(urltop, mail,code){
  
  var sendurl = urltop + "/register/" + code;
  console.log(urltop);
  var regEmail = "";
  regEmail += "<H1>Welcome " + mail + " to Game Blog!</H1>";
  regEmail += "<p>Ok your almost done, just click on the link below, check the box that you've read our EULA and your all set to comment!</p>";
  regEmail += "<a href=" + sendurl + "/?emailaddy=" + mail + ">CLICK ME :D</a>";
  
  var mailOptions = {
    from: 'GameBlog911@gmail.com',
    to: mail,
    subject: 'GameBlog Registration',
    text: '',
    html: regEmail
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
    
}
  
module.exports = SendRegMail;