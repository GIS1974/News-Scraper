//Require dependencies
var express = require("express");
var mongoose = require("mongoose");
var handlebars = require("express-handlebars");
var bodyParser = require("body-parser");

//Set up port (host's designated OR 3000)
var PORT = process.env.PORT || 3000;

//Instantiate Express App
var app = express();

//Set up an Express Router
var router = express.Router();

//Require routes file pass the router object
require("./config/routes")(router);

//Designate the public folder as a static directory
app.use(express.static(__dirname + "/public"));

//Connect Handlebars to the Express app
app.engine("handlebars", handlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Use bodyParser in the app
app.use(bodyParser.urlencoded({
    extended: false
}));

//Have every request go through the router middleware
app.use(router);

//If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//Connect mongoose to the database
mongoose.connect(db, function(error) {
    //Log any errors connecting with mongoose
    if (error) {
        console.log(error);
    }
    //Or log a success message
    else {
        console.log("mongoose connection is successful");
    }
});

//Listen on the port
app.listen(PORT, function(){
    console.log("Listening on port: " + PORT);
});