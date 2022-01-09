var mongoose = require("./app/config/mongoose");
var express = require("./app/config/express");

var db = mongoose();
var app = express();

var http = require("http").createServer(app);

// Starting the server
http.listen(process.env.PORT || 4000);
