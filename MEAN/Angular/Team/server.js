const express = require( "express");
const path = require( "path");
const app = express();

app.use(express.static( __dirname + '/public/dist' ));


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//------------------------ Mongo / Mongoose ------------------------//

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TeamManagerAPI');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema; //for relationships

var PlayerSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength:2, maxlength:50},
    position: {type: String, default: "none", required: false, minlength:2, maxlength:50}, 
}, {timestamps: false})
// games: [{ 
//     _game: {type: Schema.Types.ObjectId, ref:'Game'},
//     status: {type: String, default: "undecided"} 
// }]
var GameSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength:2, maxlength:50},
    roster: [] 
}, {timestamps: false})

// { 
//     player_id: {type: Schema.Types.ObjectId, ref:'Player'},
//     playername: {type: String, minlength:2, maxlength:50}, 
//     status: {type: String, default: "undecided"} 
// }

mongoose.model('Player', PlayerSchema);
const Player = mongoose.model('Player');
mongoose.model('Game', GameSchema);
const Game = mongoose.model('Game');


//------------------------ API routes ------------------------//
//------- Players ------//
app.post('/player/q', function(req, res){
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
})

app.get('/player', function(req, res){
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
    

})

app.post('/player', function(req, res){
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
})

app.delete('/player/:id', function(req, res){
    Player.deleteOne({_id: req.params.id}, function(err, data){
        if(err){
            console.log("delete player : ", err);
            res.json({errors: err});
        } else {
            console.log("Deleted --- ", req.params.id);
            res.json(data);
        }
    })
})

//------- Games ------//
app.get('/game', function(req, res){
    Game.find({})
    .populate("players")
    .exec(function(err, all_games){
        if(err){
            console.log("get all games : ", err)
            res.json({errors: err});
        }else{
            console.log("Sending all games -- ")// , all_players );
            res.json({games : all_games});
        }
    })
})

app.put('/game/:id/clearroster', function(req, res){
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
})

app.put('/game/:id/updateroster', function(req, res){
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
})

app.put('/game/:id/buildroster', function(req, res){
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
})



app.get('/game/:id', function(req, res){
    Game.findOne({_id: req.params.id}, function(err, this_game){
        if(err){
            console.log("get one game : ", err);
            res.json({errors: err});
        } else {
            console.log("Sending One Game --- ", this_game._id);
            res.json({game: this_game});
        }
    })
})

app.post('/game', function(req, res){
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
})




app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/index.html"))
});


app.listen(8000, function() {
    console.log("listening on port 8000");
})