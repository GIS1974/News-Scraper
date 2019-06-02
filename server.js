//Require dependencies
var express = require("express");

//Set up port (host's designated OR 3000)
var PORT = process.env.PORT || 3000;

//Instantiate Express App
var app = express();

//Set un an Express Router
var router = express.Router();

//Designate the public folder as a static directory
app.use(express.static(__dirname + "/public"));

//Have every request go through the router middleware
app.use(router);

//Listen on the port
app.listen(PORT, function(){
    console.log("Listening on port: " + PORT);
});