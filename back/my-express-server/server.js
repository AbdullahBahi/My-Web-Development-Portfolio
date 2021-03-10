const express = require("express");
const app = express();
app.use(express.static("C://web_dev//front//Simon game//Simon Game Challenge Starting Files"));

app.get("/", function(req, res){
    res.send("<h1>Hello World</h1>")
});

app.get("/simon", function(req, res){
    res.sendFile("C://web_dev//front//Simon game//Simon Game Challenge Starting Files//index.html")
});

app.listen(3000, function(){
    console.log("Server started on port 3000")
})