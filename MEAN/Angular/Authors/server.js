//=========== NODE SERVER ==========//
const express = require("express"),
  path = require("path"),
  bodyParser = require('body-parser')

const  app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static( __dirname + '/public/dist' ));

require('./server/config/mongoose'); // imports models and their controllers and connects to MongoDB
require('./server/config/routes.js')(app) // imports routing to direct http traffic to the propper controller

app.listen(8080, function() {
    console.log("\033[0;37mListening on port 8080, why not! - \033[1;31m (V)(°m°)(V)\033[0;37m");
})