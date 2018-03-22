const express = require( "express");
const path = require( "path");
const app = express();

app.use(express.static( __dirname + '/shinto/dist' ));

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./shinto/dist/index.html"))
  });

app.listen(8000, function() {
    console.log("listening on port 8000");
})