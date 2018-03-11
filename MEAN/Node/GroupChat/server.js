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
const userArray = []; //username and socket.id
const board = []; //stores message post as objects
io.sockets.on('connection', function(socket) {
  console.log("Client/socket connected! id: ", socket.id);
  socket.emit('update_board', {board:  board});

  socket.on( "new_username", function(user){
      console.log("NEW USERNAME FOR ",socket.id ,' : ', user.new_username );
      userArray.push( {id:socket.id, username: user.new_username} );
      io.emit( 'update_board', {board:  board});
  })

  socket.on( "new_message", function(message){
      console.log( 'Someone added a message! ', socket.id ,': (aka)', message.username , ' -> ', message.message);
      board.push( {username: message.username, message: message.message} );
      io.emit( 'update_board', {board:  board});
  })

  socket.on( "disconnect", function(){
      let killName = "";
      for (x in userArray){
        if (userArray[x].id == socket.id){
          killName = userArray[x].username;
          userArray.slice(x,1);
        }
      } //end for
      console.log( 'Someone disconnected! ---> ',socket.id," (aka) ", killName);

  })
})
