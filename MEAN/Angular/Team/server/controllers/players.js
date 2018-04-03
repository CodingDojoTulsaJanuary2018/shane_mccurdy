const mongoose = require('mongoose'),
    Player = mongoose.model('Player')


module.exports = {
    getSome: function(req, res){
        console.log("Q --- ",req.body.q)
        Player.find(req.body.q, function(err, q_players){
            if(err){
                console.log("51 : ", err)
                res.json({errors: err});
            }else{
                console.log("Sending selected players -- ")// , all_players );
                res.json({players : q_players});
            }
        })
    },
    getAll: function(req, res){
        Player.find({}, function(err, all_players){
            if(err){
                console.log("61 : ", err)
                res.json({errors: err});
            }else{
                console.log("Sending all players -- ")// , all_players );
                all_players.sort({path: "position", options: { sort: {'rank': -1} }})
                res.json({players : all_players});
            }
        })
    },
    createOne: function(req, res){
        console.log(req.body.new_player)
        let player = new Player(req.body.new_player);
        player.save(function(err, new_player){
            if(err){
                console.log("58 : ", err);
                res.json({errors: err});
            } else {
                console.log("New Player --- ", new_player);
                res.json({player : new_player});
            }
        })
    },
    deleteOne: function(req, res){
        Player.deleteOne({_id: req.params.id}, function(err, data){
            if(err){
                console.log("delete player : ", err);
                res.json({errors: err});
            } else {
                console.log("Deleted --- ", req.params.id);
                res.json(data);
            }
        })
    }

}