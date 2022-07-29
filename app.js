var express = require('express');
var app = express();
const port = process.env.PORT || 5000;

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));


app.get('/',function(req,res){
    res.render('pages/index');
});

app.get('/roadmap',function(req,res){
    res.render('pages/roadmap');
});

//Listening to port
app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
    
   
   
});
