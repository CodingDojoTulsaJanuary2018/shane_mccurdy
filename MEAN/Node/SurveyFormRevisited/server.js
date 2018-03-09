// Import express and path modules.
const express = require( "express");
const path = require( "path");
// Create the express app.
const app = express();
// Define the static folder.
app.use(express.static(path.join(__dirname, "./static")));
// Setup ejs templating and define the views folder.
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// Root route to render the index.ejs view.
app.get('/', function(req, res) {
 res.render("the_index");
})

const server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
const io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);
  // all the server socket code goes in here
  socket.on( "posting_form", function (data){
      console.log( 'SENT --> '  + data.formData.name, data.formData.location, data.formData.language, data.formData.comment );
      let rando = Math.floor(Math.random()*1000)+1;
      socket.emit( 'updated_message', {formData:  data.formData, random_number: rando});
  })
  socket.on( "disconnect", function (){
      console.log( 'Someone disconnected! --> '  + socket.id);

  })
})
