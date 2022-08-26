var express = require('express');
var app = express();

const port = process.env.PORT || 5000;
var nodemailer = require('nodemailer');

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




app.post("/contact", (req,res)=>{
    var mailContent = {
        name: req.body.name,
        email: req.body.email,
        company: req.body.company,
        message: req.body.message
    }
  
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'contact@ambiplatforms.com',
          pass: 'hzuebrukbdkjpsmq',
        }
    });
  
    var mailOptions = {
        from: mailContent.email,
        to: 'contact@ambiplatforms.com',
        company: mailContent.company,
        text: mailContent.name + " sent you a message : \n" +"\n Message: "+ JSON.stringify(mailContent.message) + "\n Email id: " + mailContent.email + "\n Company: " + mailContent.company
      };
  
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.redirect("/contact");
        }
      });  
  
      transporter.close();
      
  });
  
//Listening to port
app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
    
   
   
});
