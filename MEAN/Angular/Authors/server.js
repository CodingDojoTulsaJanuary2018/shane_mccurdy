const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static( __dirname + '/public/dist' ));

//=========== MONGOOSE ==========//
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authors');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema; //for relationships

var AuthorSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength:3, maxlength:255},
    quotes: [{type: Schema.Types.ObjectId, ref: 'Quote'}]
  }, {timestamps: true})

var QuoteSchema = new mongoose.Schema({
    quote: {type: String, required: true, minlength:3, maxlength:255},
    rank: {type: Number, default:0},
    _author: {type: Schema.Types.ObjectId, ref: 'Author'}
}, {timestamps: true})

mongoose.model('Author', AuthorSchema);
const Author = mongoose.model('Author');
mongoose.model('Quote', QuoteSchema);
const Quote = mongoose.model('Quote');
//=========== END MONGOOSE ==========//


app.listen(8000, function() {
    console.log("listening on port 8000");
})


app.get('/author', function(req, res) { // will serve up the full collection
    Author.find({}, function(err, all_authors) {
      if(err) {
        console.log('something went wrong : 33'); // <--these numbers are line numbers for debugging
        res.json({errors: err.errors});
      } else {
        console.log('index visited! sending all...');
        res.json({all_authors});
      }
    }) // end .find all
  })
  
  app.post('/author', function(req, res) { // will add into the database
    let author = new Author({name: req.body.name });
    author.save(function(err, new_author) {
      if(err) {
        console.log('something went wrong : 46');
        res.json({errors: err.errors});
      } else {
        console.log('successfully added one!');
        res.json({message: "Success", task: new_author});
      }
    }) // end .save
  })
  
  app.get('/author/:id', function(req, res) { // displays information about one
    console.log("tried by id --- ", req.params.id);
    Author.findOne({_id: req.params.id})
    .populate( {path: "quotes", options: { sort: {'rank': -1} }} )
    .exec(function(err, this_author) {
      if(err) {
        console.log('something went wrong : 67');
        res.json({errors: err.errors});
      } else {
        console.log('sending one by id --- ', this_author );
        res.json({this_author});
      }
    })// end .findOne
  })
  
  app.post('/author/:id/quote', function(req, res) { // will update the database.
    console.log("push sent --- ", req.params.id);
    Author.findOne( {_id: req.params.id}, function(err, this_author) {
      if(err) {
        console.log('something went wrong : 80');
        res.json({errors: err.errors});
      } else {
        let new_quote = new Quote({quote: req.body.quote});
        new_quote._author=this_author._id;
        new_quote.save(function(err){
            this_author.quotes.push(new_quote);
            this_author.save(function(err){
                if(err){
                    console.log("91 --- ",err);
                }
            });
        });
        console.log('new quote --- ', new_quote);
        res.json({message: "Success", author: this_author, quote: new_quote});
      }
    }) //end .update
  })

  app.put('/author/:id', function(req, res) { // will update the database.
    console.log("update sent --- ", req.params.id);
    Author.update( {_id: req.params.id} , {name: req.body.name}, function(err, data) {
      console.log(data);
      if(err) {
        console.log('something went wrong : 87');
        res.json({errors: err.errors});
      } else {
        console.log('successfully updated --- ', req.params.id);
        res.json({message: "Success", author: data});
      }
    }) //end .update
  })
  
  app.delete('/author/:id', function(req, res) { // will delete from the database.
    console.log("delete order sent --- ", req.params.id);
    Author.deleteOne( {_id: req.params.id}, function(err, data) {  //also .remove() works
      if(err) {
        console.log('something went wrong : 101');
        res.json({errors: err.errors});
      } else {
        console.log('successfully deleted --- ', req.params.id);
        res.json({message: "Success", data: data});
      }
    }) //end .remove
  })

  app.put('/quote/:q_id', function(req, res) { // will update the database.
    console.log("update sent --- ", req.params.q_id);
    Quote.findOne( {_id: req.params.q_id}, function(err, quote) {
        if(err) {
            console.log('something went wrong : 135');
            res.json({errors: err.errors});
        } else {
            quote.rank+=req.body.num;
            quote.save(function(err){
                if(err){
                    console.log("141 : ",err)
                } else {
                    console.log('successfully voted --- ', quote);
                    res.json({message: "Success", quote: quote});
                }
            })  
        }
    }) //end .update
  })

  app.delete('/quote/:q_id', function(req, res) { // will delete from the database.
    console.log("delete order sent --- ", req.params.q_id);
    Quote.deleteOne( {_id: req.params.q_id}, function(err, data) {  //also .remove() works
      if(err) {
        console.log('something went wrong : 154');
        res.json({errors: err.errors});
      } else {
        console.log('successfully deleted --- ', req.params.id);
        res.json({message: "Success", data: data});
      }
    }) //end .deleteOne
  })


  app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/index.html"))
});