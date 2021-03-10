const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("C://web_dev//front//weather"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile("C://web_dev//front//weather//weather.html")
});

app.post("/", function(req, res){
    const query = req.body.cityName
    const apiKey = "24ddc0ffb3d7adf37c142c7a1e68cb06"
    const unit = "metric"
    url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&appid="+apiKey
    https.get(url, function(response){
        response.on("data", function(data){
            weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const city = weatherData.name
            const icon = weatherData.weather[0].icon
            iconUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
            res.write("<p>The weather is currently "+description+"<p>")
            res.write("<h1>The temperature in "+city+" is"+temp+" degrees Celsius<h1>")
            res.write("<img src="+ iconUrl +">")
            res.send()
        })
    }) 
    
});

app.listen(3002, function(){
    console.log("Server started on port 3002");
});