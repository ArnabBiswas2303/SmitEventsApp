let express = require('express');
let app = express();
let port = process.env.PORT || 8080;
let bodyParser = require('body-parser');

app.use(express.static(__dirname+'/public'));
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.render('main.ejs');
});

app.listen(port, function(req,res){
    console.log('Server running on port: '+port);
});