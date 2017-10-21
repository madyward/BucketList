//DECLARE VARIABLES & SET UP INSTANCES
var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var app = express();
var router = require("./router");
var mongoose = require("mongoose");
var cors = require("cors");

//DATABASE CONNECTION:
mongoose.connect("mongodb://localhost:bucket/bucket");

//MIDDLEWARE
app.use(cors());
app.use(bodyParser.json({type: "*/*"}));
router(app);

var port = process.env.PORT || 3000;
var server = http.createServer(app);

server.listen(port);
console.log("Server is listening on " + port);