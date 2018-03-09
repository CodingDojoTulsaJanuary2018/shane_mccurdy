const express = require("express");
const app = express();

app.use(express.static(__dirname + "/static"));

app.set('views', __dirname+"/views");
app.set('view engine', 'ejs');

var the_count = 0;
app.get('/', function(req,res){
  the_count++;
  res.render('the_index', {count: the_count});
})
app.get('/add_two', function(req,res){
  the_count++;
  res.redirect('/');
})
app.get('/reset', function(req,res){
  the_count = 0;
  res.redirect('/');
})


app.listen(8000, function() {
  console.log("listening on port 8000");
})
