var express = require("express");
var request = require("request");

var app = express();
var port = 3000;

var stocks = ["TSE:WEED","TSE:ACB"];

function getStocks(Stocks, res){

    var key = "6FEH5E1H0ZR89A8V";
    var StockData = [];

    var jsonContent = null;

    var stock_symbol = null;
    var stock_last = null;
    var stock_current_price = null;

    for(var i = 0; i < Stocks.length; i++){
        request(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${Stocks[i]}&apikey=${key}`, function(err, res, body){
            jsonContent = JSON.parse(body);

            //store data inside Javascript object
            stock_symbol = jsonContent['Meta Data']['2. Symbol'];
            stock_last = jsonContent['Meta Data']['3. Last Refreshed'];
            stock_current_price = jsonContent['Time Series (Daily)'][stock_last]['4. close'];

            var stockObject = {symbol:stock_symbol, last_updated:stock_last, current_price:stock_current_price};
            StockData.push(stockObject);

            console.log('Stock Symbol: ' + stockObject.symbol + ', Last Updated: ' + stockObject.last_updated + ', Current Price: ' + stockObject.current_price + '$');
        });
    }

}

app.get('/', function(req,res){
    getStocks(stocks, res);
});

app.listen(port, function(){

});



