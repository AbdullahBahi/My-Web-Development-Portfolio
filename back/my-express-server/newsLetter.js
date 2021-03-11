const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { json } = require("body-parser");

const app = express();

app.use(express.static(process.cwd()+"/front"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(process.cwd()+"/front//portfolio.html")
});

// Drum Kit App
// get and post requests of Drum Kit App
app.get("/drumkit", function(req, res){
    res.sendFile(process.cwd()+"/front//drumKit.html")
});

app.post("/drumkitredirect", function(req, res){
    res.redirect("/drumkit")
});

// Simon game 
app.post("/simonredirect", function(req, res){
    res.redirect("/simon")
});

// get request simon game
app.get("/simon", function(req, res){
    res.sendFile(process.cwd()+"/front//simon.html")
});

// =================================================================
// =================================================================

// Dicee game
// get and post requests of dicee game
app.get("/dicee", function(req, res){
    res.sendFile(process.cwd()+"/front//dicee.html");
});

app.post("/diceeredirect", function(req, res){
    res.redirect("/dicee")
});

// =================================================================
// =================================================================

// newsletter App
app.get("/newsletter", function(req, res){
    res.sendFile(process.cwd()+"/front//signup.html")
});

app.post("/newsletter", function(req, res){
    const firstName = req.body.fname
    const lastName = req.body.lname
    const email = req.body.email

    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)

    url = "https://us1.api.mailchimp.com/3.0/lists/cf82d71bb9"

    options = {
        method:"POST",
        auth:"derb:22e2fe4ec72d50f2806aac2d473641a0-us1"
    }
    const request = https.request(url, options, function(response){
        if (response.statusCode === 200){
            res.sendFile(process.cwd()+"/front//success.html")
        }else{
            res.sendFile(process.cwd()+"/front//failure.html")
        }
    })

    request.write(jsonData)
    request.end()
        
});

app.post("/newsletterredirect", function(req, res){
    res.redirect("/newsletter")
});

// =================================================================
// =================================================================

// BMI Calculator App
// get and post requests of BMI calculator app
app.get("/bmicalculator", function(req, res){
    res.sendFile(process.cwd()+"/front//calc.html");
});

app.post("/bmicalculator", function(req, res){
    var weight = Number(req.body.num1);
    var height = Number(req.body.num2);
    var BMI = weight/(height*height);
    res.write("<h1>Your BMI is: "+ BMI+"</h1>")
    res.write("<div class='jumbotron jumbotron-fluid'><div class='container'><form action='/bmicalcredirect' method='POST'><button class='btn btn-lg btn-warning' type='submit' name='button'>Try again</button></form></div></div>")
    res.send();
});

app.post("/bmicalcredirect", function(req, res){
    res.redirect("/bmicalculator")
});

// =================================================================
// =================================================================

// Weather App
// get and post requests of weqther app
app.get("/weather", function(req, res){
    res.sendFile(process.cwd()+"/front//weather.html")
});

app.post("/weather", function(req, res){
    const query = req.body.cityName
    const apiKey = "24ddc0ffb3d7adf37c142c7a1e68cb06"
    const unit = "metric"
    url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&appid="+apiKey
    https.get(url, function(response){
        response.on("data", function(data){
            if (response.statusCode === 200){
                weatherData = JSON.parse(data)
                const temp = weatherData.main.temp
                const description = weatherData.weather[0].description
                const city = weatherData.name
                const icon = weatherData.weather[0].icon
                iconUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
                res.write("<p>The weather is currently "+description+"<p>")
                res.write("<h1>The temperature in "+city+" is"+temp+" degrees Celsius<h1>")
                res.write("<img src="+ iconUrl +">")
                res.write("<div class='jumbotron jumbotron-fluid'><div class='container'><form action='/weatherredirect' method='POST'><button class='btn btn-lg btn-warning' type='submit' name='button'>Try again</button></form></div></div>")

                res.send()
            }else{
                res.send("<div class='jumbotron jumbotron-fluid'><div class='container'><h1 class='display-4'>Uh oh!</h1><p class='lead'>There was a problem getting weather data, please try again.</p><form action='/weatherredirect' method='POST'><button class='btn btn-lg btn-warning' type='submit' name='button'>Try again</button></form></div></div>")
            }
        })
    }) 
});

app.post("/weatherredirect", function(req, res){
    res.redirect("/weather")
});

// =================================================================
// =================================================================








app.listen(process.env.PORT || 3003, function(){
    console.log("Server started on port 3003");
});