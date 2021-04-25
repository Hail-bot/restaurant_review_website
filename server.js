"use strict";

const express = require("express");
const routeRestaurants = require("./routes/routeRestaurants");
const routeReviews = require('./routes/routeReviews');
const routeUsers = require("./routes/routeUsers")
const bodyParser = require("body-parser");
var app = express();
var host = "127.0.0.1";
var port = 8080;
var startPage = "restaurants.html";

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


routeRestaurants.routeRestaurants(app);
routeReviews.routeReviews(app);
routeUsers.routeUsers(app);

function gotoIndex(req, res) {
    console.log(req.params);
    res.sendFile(__dirname + "/" + startPage);
}

app.get("/" + startPage, gotoIndex);

app.route("/");

var server = app.listen(port, host, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
