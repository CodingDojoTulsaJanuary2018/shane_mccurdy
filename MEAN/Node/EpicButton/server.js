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

const server = app.listen(6789, function() {
 console.log("listening on port 6789");
});
const io = require('socket.io').listen(server);
let counter = 0;
io.sockets.on('connection', function (socket) {
  console.log("Client/socket connected! id: ", socket.id);
  socket.emit( 'update_counter', {count:  counter});
  // all the server socket code goes in here
  socket.on( "button_clicked", function (){
      console.log( 'Someone clicked a button! ', socket.id ,': ' , counter, ' -> ', ++counter);
      io.emit( 'update_counter', {count:  counter});
  })
  socket.on( "reset_clicked", function (){
      let temp = counter;
      counter = 0;
      console.log( 'This jerk just clicked RESET! ', socket.id ,': ' , temp, ' -> ', counter );
      io.emit( 'update_counter', {count:  counter});
  })
  socket.on( "disconnect", function (){
      console.log( 'Someone disconnected! --> '  + socket.id);

  })
})
