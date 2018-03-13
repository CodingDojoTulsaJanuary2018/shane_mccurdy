const express = require( "express");
const path = require( "path");
const app = express();

app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quoting_dojo');
mongoose.Promise = global.Promise;

var QuoteSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength:2, maxlength:30},
  quote: {type: String, required: true, minlength:2, maxlength:255}
}, {timestamps: true})

mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');

app.listen(8000, function() {
 console.log("listening on port 8000");
})

app.get('/', function(req, res) {

    res.render('index');
})

app.post('/quotes', function(req, res) {
  console.log("POST DATA", req.body);
  let quote = new Quote({name: req.body.name, quote: req.body.quote});
  quote.save(function(err) {
    if(err) {
      console.log('something went wrong');
      res.render('index', {errors: quote.errors});
    } else {
      console.log('successfully added a quote!');
      res.redirect('/quotes');
    }
  })
})

app.get('/quotes', function(req, res) {
  Quote.find({}, function(err, quotes) {
    if(err) {
      console.log('something went wrong');
      res.render('dashboard', {errors: quote.errors});
    } else {
      console.log('successfully added a quote!');
      // console.log(quotes);
      res.render('dashboard', {quotes: quotes});
    }
  })
})
