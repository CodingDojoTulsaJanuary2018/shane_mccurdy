const express = require("express");
const app = express();

app.use(express.static(__dirname + "/static"));

app.set('views', __dirname+"/views");
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//----ROUTES----
app.get('/', function(req,res){
  res.render('the_index', {});
})

app.post('/result', function(req,res){
  let postdata = {
    name: req.body.name,
    location: req.body.location,
    language: req.body.language,
    comment: req.body.comment
  }
  res.render('the_result', {data: postdata});
})


app.listen(8000, function() {
  console.log("listening on port 8000");
})
