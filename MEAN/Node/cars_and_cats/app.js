// IMPORTANT !!!!!!!!!!!!! This is bare Node, no Express 

// get the http module:
var http = require('http');
// fs module allows us to read and write content for responses!!
var fs = require('fs');
// creating a server using http module:
var server = http.createServer(function (request, response){
    // see what URL the clients are requesting:
    console.log('client request URL: ', request.url);
    // this is how we do routing:
    if(request.url === '/cars') {
        fs.readFile('./views/cars.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    }
    else if (request.url === "/cats") {
         fs.readFile('./views/cats.html', 'utf8', function (errors, contents){
             response.writeHead(200, {'Content-type': 'text/html'});
             response.write(contents);
             response.end();
         });
    }
    else if (request.url === "/cars/new") {
         fs.readFile('./views/cars_new.html', 'utf8', function (errors, contents){
             response.writeHead(200, {'Content-type': 'text/html'});
             response.write(contents);
             response.end();
         });
    }
    else if(request.url === '/images/car1.jpeg'){
      // notice we won't include the utf8 encoding
      fs.readFile('./images/car1.jpeg', function(errors, contents){
          response.writeHead(200, {'Content-type': 'image/jpg'});
          response.write(contents);
          response.end();
      })
    }
    else if(request.url === '/images/car2.jpeg'){
      // notice we won't include the utf8 encoding
      fs.readFile('./images/car2.jpeg', function(errors, contents){
          response.writeHead(200, {'Content-type': 'image/jpg'});
          response.write(contents);
          response.end();
      })
    }
    else if(request.url === '/images/car3.jpeg'){
      // notice we won't include the utf8 encoding
      fs.readFile('./images/car3.jpeg', function(errors, contents){
          response.writeHead(200, {'Content-type': 'image/jpg'});
          response.write(contents);
          response.end();
      })
    }
    else if(request.url === '/images/cat1.jpeg'){
      // notice we won't include the utf8 encoding
      fs.readFile('./images/cat1.jpeg', function(errors, contents){
          response.writeHead(200, {'Content-type': 'image/jpg'});
          response.write(contents);
          response.end();
      })
    }
    else if(request.url === '/images/cat2.jpeg'){
      // notice we won't include the utf8 encoding
      fs.readFile('./images/cat2.jpeg', function(errors, contents){
          response.writeHead(200, {'Content-type': 'image/jpg'});
          response.write(contents);
          response.end();
      })
    }
    else if(request.url === '/images/cat3.jpeg'){
      // notice we won't include the utf8 encoding
      fs.readFile('./images/cat3.jpeg', function(errors, contents){
          response.writeHead(200, {'Content-type': 'image/jpg'});
          response.write(contents);
          response.end();
      })
    }
    else if(request.url === '/stylesheets/style.css'){
      fs.readFile('./stylesheets/style.css', 'utf8', function(errors, contents){
       response.writeHead(200, {'Content-type': 'text/css'});
       response.write(contents);
       response.end();
      })
    }
    // request didn't match anything:
    else {
        response.end('<h1 style="text-align:center; color: #333; padding: 300px 0; font-family:verdana; font-size: 5em;" >URL requested is not available</h1>');
    }
});
// tell your server which port to run on
const port = 7077
server.listen(port);
// print to terminal window
console.log("Running in localhost at http://localhost:" + port);