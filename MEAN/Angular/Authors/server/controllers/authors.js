//=========== AUTHOR CONTROLLER ==========//
const mongoose = require('mongoose'),
    Author = mongoose.model('Author'),
    Quote = mongoose.model('Quote')

module.exports = {
    getAll: function(req, res){
        Author.find({}, function(err, all_authors) {
            if(err) {
              console.log('something went wrong : 33'); // <--these numbers are line numbers for debugging
              res.json({errors: err.errors});
            } else {
              console.log('index visited! sending all...');
              res.json({all_authors});
            }
        }) // end getAll
    },

    postOne: function(req, res) { // will add into the database
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
    },

    getOne: function(req, res) { // displays information about one
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
    },

    addQuote: function(req, res) { // will update the database.
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
    },

    updateOne: function(req, res) { // will update the database.
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
    },

    deleteOne: function(req, res) { // will delete from the database.
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
    },


}//end module.exports
