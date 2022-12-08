var express = require('express');
var app = express();

const port = process.env.PORT || 5000;
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser')



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));


app.get('/',function(req,res){
    res.render('pages/index');
});

app.get('/roadmap',function(req,res){
    res.render('pages/roadmap');
});

app.get('/contact',function(req,res){
    res.render('pages/contact');
});

app.get('/thankyou',function(req,res){
  res.render('pages/thankyou');
});



app.post("/contact", function(req,res,){
 
// g-recaptcha-response is the key that browser will generate upon form submit.
  // if its blank or null means user has not selected the captcha, so return the error.
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
  }
  // Put your secret key here.
  var secretKey = "6LfaimMjAAAAAHfG-cViK8BnwzPShm-RxJPd4cHx";
  // req.connection.remoteAddress will provide IP address of connected user.
  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
 
  request(verificationUrl,function(error,response,body) {
    body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
    if(body.success !== undefined && !body.success) {
      return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
    }
    res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
  });

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'rahul@ambiplatforms.com',
          pass: 'erhpenuuqmzdxqow',
        }
    });
  
    var mailOptions = {
        from: req.body.email+"Sent Mail on TorqueHQ",
        to: 'rahul@ambiplatforms.com',
        subject: 'To Torque!',
        company: req.body.company,
        text: req.body.name + " sent you a message : \n" +"\n Message: "+ JSON.stringify(req.body.message) + "\n Email id: " + req.body.email + "\n Company: " + req.body.company
      };
  
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.redirect("/thankyou");
        }
      });  
  
      transporter.close();
      
  });
  
//Listening to port
app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
    
   
   
});
