const mongoose = require('mongoose'),
    Game = mongoose.model('Game'),
    Player = mongoose.model('Player') //for buildroster

module.exports = {
    getAll: function(req, res){
        Game.find({},function(err, all_games){
            if(err){
                console.log("get all games : ", err)
                res.json({errors: err});
            }else{
                console.log("Sending all games -- ")// , all_players );
                res.json({games : all_games});
            }
        })
    },
    clearRoster: function(req, res){
        Game.findOne({_id: req.params.id}, function(err, this_game){
            if(err){
                console.log("clear roster : ", err);
                res.json({errors: err});
            } else {
                console.log("Clearing Roster From Game --- ", this_game);
                this_game.roster = [];
                this_game.save(function(err){console.log("save game roster : ", err)});
            }
        res.json({game: this_game});
        })
    },
    upadateRoster: function(req, res){
        Game.findOne({_id: req.params.id}, function(err, this_game){
            if(err){
                console.log("update roster : ", err);
                res.json({errors: err});
            } else {
                console.log("Updating Roster --- ", this_game._id);
                this_game.roster = req.body.updated_roster;
                this_game.save(function(err){console.log("save updated game roster : ", err)});
            }
        res.json({game: this_game});
        })
    },
    buildroster: function(req, res){
        Game.findOne({_id: req.params.id}, function(err, this_game){
            if(err){
                console.log("build roster : ", err);
                res.json({errors: err});
            } else {
                console.log("Adding Roster To Game --- ", this_game," >>>>>> " ,req.params.id);
                Player.find({}, function(err, players){ //all the players into roster array
                    if(err){
                        console.log("Problem getting roster : ", err);
                        res.json({errors: err});
                    } else {
                        this_game.roster = []
                        for (x in players){
                           player_obj = {
                               player_id : players[x]._id,
                               player_name : players[x].name,
                               player_status : 0
                           }
                           this_game.roster.push(player_obj);
                        } //end for
                    } //end else
                    this_game.save(function(err){console.log("save game roster : ", err)});
                    res.json({game: this_game});
                })   
            }
        })
    },
    getOne: function(req, res){
        Game.findOne({_id: req.params.id}, function(err, this_game){
            if(err){
                console.log("get one game : ", err);
                res.json({errors: err});
            } else {
                console.log("Sending One Game --- ", this_game._id);
                res.json({game: this_game});
            }
        })
    },
    updateOne: function(req, res){
        let game = new Game({name: req.body.name});
        game.save(function(err, new_game){
            if(err){
                console.log("create game : ", err);
                res.json({errors: err});
            } else {
                console.log("New Game --- ", new_game);
                res.json({game : new_game});
            }
        })
    }


} //end module.exports