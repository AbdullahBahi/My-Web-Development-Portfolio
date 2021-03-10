const { static } = require("express");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("C://web_dev//front//calculator"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/bmicalculator", function(req, res){
    res.sendFile("C://web_dev//front//calculator//calc.html");
});

app.post("/bmicalculator", function(req, res){
    var weight = Number(req.body.num1);
    var height = Number(req.body.num2);
    var BMI = Math.floor((weight/(height*height)));
    res.send("Your BMI is: "+ BMI);
});

app.listen(3001, function(){
    console.log("Server started on port 3001");
});