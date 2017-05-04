// Require express, initialize it, and pass it to the HTTP module as a web server
var express = require('express');
var app = express();
var http = require('http').Server(app);

// Include path module to resolve relative paths safely
var path = require('path');

// Set the public directory for serving static files from express
app.use(express.static(__dirname));

// Define a route handler to serve responses on the home page
app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/public/views/index.html'));
});

// Set the web server to listen on port 5000, or the environment port variable if specified
var port = process.env.PORT || 5000;
http.listen(port, function() {
    console.log('listening on *: ' + port);
});