const express = require( "express");
const path = require( "path");
const app = express();

app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoose_dashboard');
mongoose.Promise = global.Promise;

var AnimalSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength:2, maxlength:30},
  age: {type: Number, required: true, max: 150, min: 0}
}, {timestamps: true})

mongoose.model('Animal', AnimalSchema);
var Animal = mongoose.model('Animal');

app.listen(8000, function() {
 console.log("listening on port 8000");
})

app.get('/', function(req, res) { //Displays all of the mongooses
  Animal.find({}, function(err, animals) {
    if(err) {
      console.log('something went wrong : 31');
      res.render('index', {errors: animal.errors});
    } else {
      console.log('index visited!');
      res.render('index', {pack: animals});
    }
  })
})

app.get('/mongooses/new', function(req, res) { // Displays a form for making a new mongoose.
  res.render('create');
})

app.get('/mongooses/:id', function(req, res) { //Displays information about one mongoose.
  console.log("tried by id ---");
  Animal.find({_id: req.params.id}, function(err, animal) {
    if(err) {
      console.log('something went wrong : 43');
      res.render('index', {errors: err.errors});
    } else {
      console.log('rendering by id --- ', animal );
      res.render('show', {this_one: animal[0]});
    }
  })
})


app.post('/mongooses', function(req, res) { // Should be the action attribute for the form in the above route (GET '/mongooses/new').
  console.log("POST DATA", req.body);
  let animal = new Animal({name: req.body.name, age: req.body.age});
  animal.save(function(err) {
    if(err) {
      console.log('something went wrong : 61');
      res.render('index', {errors: err.errors});
    } else {
      console.log('successfully added a mongoose! : 65');
      res.redirect('/');
    }
  })
})

app.get('/mongooses/edit/:id', function(req, res) { // Should show a form to edit an existing mongoose.
  Animal.find({_id: req.params.id}, function(err, animal) {
    if(err) {
      console.log('something went wrong : 73');
      res.render('index', {errors: err.errors});
    } else {
      res.render('update', {this_one: animal[0]});
    }
  })
})

app.post('/mongooses/:id', function(req, res) { // Should be the action attribute for the form in the above route (GET '/mongooses/new').
  console.log("84 : POST DATA", req.body);
  Animal.find( {_id: req.params.id}, function(err, animal) {
    animal[0].name = req.body.name;
    animal[0].age = req.body.age;
    animal[0].save(function(err){
      if(err) {
        console.log('something went wrong : 89');
        res.render('index', {errors: err.errors});
      } else {
        console.log('successfully updated a mongoose! --- ', req.params.id, req.params.name, req.params.age);
        res.redirect('/');
      }
    }) //end animal.save
  }) //end Animal find
})

app.get('/mongooses/destroy/:id', function(req, res) { // Should be the action attribute for the form in the above route (GET '/mongooses/new').
  console.log("101 : kill order sent --- ", req.params.id);
  Animal.remove( {_id: req.params.id}, function(err) {
    if(err) {
      console.log('something went wrong : 89');
      res.render('index', {errors: err.errors});
    } else {
      console.log('successfully killed a mongoose!');
      res.redirect('/');
    }
  }) //end Animal remove
})
