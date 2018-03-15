const express = require( "express");
const path = require( "path");
const app = express();


const bodyParser = require('body-parser');
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/1955');
mongoose.Promise = global.Promise;

var PeopleSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength:2, maxlength:30},
}, {timestamps: false})

mongoose.model('People', PeopleSchema);
var People = mongoose.model('People');

app.listen(8000, function() {
 console.log("listening on port 8000");
})

app.get('/', function(req, res) { // will serve up the full collection of people born in 1955
  People.find({}, function(err, people) {
    if(err) {
      console.log('something went wrong : 31');
      res.json({errors: err.errors});
    } else {
      console.log('index visited!');
      res.json({people});
    }
  })
})

app.get('/remove/:name', function(req, res) { // will delete a name from the database.
  console.log("101 : kill order sent --- ", req.params.id);
  People.remove( {name: req.params.name}, function(err) {
    if(err) {
      console.log('something went wrong : 40');
      res.json({errors: err.errors});
    } else {
      console.log('successfully killed ', req.params.name,'!');
      res.redirect('/');
    }
  }) //end remove
})

app.get('/new/:name', function(req, res) {
  // will add a name into the database which can be used for blank spaces.
  // So adding Steve Jobs to our database, you'd type in the URL 'localhost:8000/new/Steve Jobs'
  let person = new People({name: req.params.name});
  person.save(function(err) {
    if(err) {
      console.log('something went wrong : 55');
      res.json({errors: err.errors});
    } else {
      console.log('successfully added a person! : 58');
      res.redirect('/');
    }
  })
})

app.get('/:name', function(req, res) { //Displays information about one person.
  console.log("tried by name --- ", req.params.name);
  People.findOne({name: req.params.name}, function(err, person) {
    if(err) {
      console.log('something went wrong : 66');
      res.json({errors: err.errors});
    } else {
      console.log('sending one by name --- ', person );
      res.json({person});
    }
  })
})
