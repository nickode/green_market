var request = require("request");

var stocks = ["TSE:WEED","TSE:ACB","TSE:APH"];
var key = "6FEH5E1H0ZR89A8V";

function GetStocks(){
    for(var i = 0; i < stocks.length; i++){
        request(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stocks[i]}&apikey=${key}`, function(err, response, body){
            var jsonContent = JSON.parse(body);

            var stockObject = {
                symbol:jsonContent['Meta Data']['2. Symbol'],
                current_price:jsonContent['Time Series (Daily)'][jsonContent['Meta Data']['3. Last Refreshed']]['4. close'],
                last_updated:jsonContent['Meta Data']['3. Last Refreshed']
            };

            console.log('Symbol:' + stockObject.symbol + ', Current Price:' + stockObject.current_price + '$, Last Updated:' + stockObject.last_updated);
        });
    }
}

GetStocks();



