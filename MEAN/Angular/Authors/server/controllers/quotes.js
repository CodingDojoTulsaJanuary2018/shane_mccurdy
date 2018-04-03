//=========== QUOTE CONTROLLER ==========//

const mongoose = require('mongoose'),
    Quote = mongoose.model('Quote')

module.exports = {
    updateRank: function(req, res) { // will update the database.
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
        }) //end .updateRank
    },

    deleteOne: function(req, res) { // will delete from the database.
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
    }



}