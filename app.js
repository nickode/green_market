var express = require("express");
var request = require("request");

var app = express();
var port = 3000;

var stocks = ["TSE:WEED","TSE:ACB"];


app.set('view engine', 'ejs');

app.get('/', function(req,res){

    var key = "6FEH5E1H0ZR89A8V";
    var StockData = [];

    for(var i = 0; i < stocks.length; i++){

        request(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stocks[i]}&apikey=${key}`, function(err, response, body){
            var jsonContent = JSON.parse(body);

            StockData.push({
                symbol:jsonContent['Meta Data']['2. Symbol'],
                current_price:jsonContent['Time Series (Daily)'][jsonContent['Meta Data']['3. Last Refreshed']]['4. close'],
                last_updated:jsonContent['Meta Data']['3. Last Refreshed']
            });
            
        });

    }

    res.render('index',{StockData: StockData});
});

app.listen(port, function(){
    console.log("Server listening on port " + port);
});



