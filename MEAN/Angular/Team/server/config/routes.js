const path = require('path'),
    players = require('../controllers/players'),
    games = require('../controllers/games')

module.exports = function(app){

    //------- Players ------//
    app.post('/player/q', function(req, res){
        players.getSome(req, res);
    })

    app.get('/player', function(req, res){
        players.getAll(req, res);
    })

    app.post('/player', function(req, res){
        players.createOne(req, res);
    })

    app.delete('/player/:id', function(req, res){
        players.deleteOne(req, res);
    })     

    //------- Games ------//
    app.get('/game', function(req, res){
        games.getAll(req,res);
    })

    app.put('/game/:id/clearroster', function(req, res){
        games.clearRoste(req,res);
    })

    app.put('/game/:id/updateroster', function(req, res){
        games.upadateRoster(req,res);
    })

    app.put('/game/:id/buildroster', function(req, res){
        games.buildroster(req,res);
    })

    app.get('/game/:id', function(req, res){
        games.getOne(req,res);
    })

    app.post('/game', function(req, res){
        games.updateOne(req,res);
    })

    //------- Catch All To Angular ------//
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/index.html"))
    });

}