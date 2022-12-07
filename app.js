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
 
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'contact@ambiplatforms.com',
          pass: 'kovaufvhgzkiohdr',
        }
    });
  
    var mailOptions = {
        from: req.body.email+"Sent Mail on TorqueHQ",
        to: 'contact@ambiplatforms.com',
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
