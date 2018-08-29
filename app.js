var express = require("express");
var request = require("request");
var app = express();

var key = "6FEH5E1H0ZR89A8V";
var port = 3000;

app.get("/url", function(req, res, next){
    request(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSE:WEED&apikey={key}`, function(){

    });
});

app.listen(port, function(){
    console.log("Server running on PORT: " + port);
} );

