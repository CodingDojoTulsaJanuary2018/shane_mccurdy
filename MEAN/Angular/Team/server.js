const express = require( "express");
const path = require( "path");
const app = express();

app.use(express.static( __dirname + '/public/dist' ));


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//------------------------ Mongo / Mongoose ------------------------//
require('./server/config/mongoose')

//------------------------ API routes ------------------------//
require('./server/config/routes')(app)

app.listen(8000, function() {
    console.log("listening on port 8000");
})