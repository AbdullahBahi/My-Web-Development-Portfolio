const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { json } = require("body-parser");

const app = express();

app.use(express.static("C://web_dev//front//newsLetter"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile("C://web_dev//front//newsLetter//signup.html")
});

app.post("/failure", function(req, res){
    res.redirect("/")
});

app.post("/", function(req, res){
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
        auth:"derb:2e2fe4ec72d50f2806aac2d473641a0-us1"
    }
    const request = https.request(url, options, function(response){
        if (response.statusCode === 200){
            res.sendFile("C://web_dev//front//newsLetter//success.html")
        }else{
            res.sendFile("C://web_dev//front//newsLetter//failure.html")
        }
        response.on("data", function(data){
            console.log(JSON.parse(data))
            //res.write("<h1>The temperature in "+city+" is"+temp+" degrees Celsius<h1>")
            //res.write("<img src="+ iconUrl +">")
            //res.send() 
        })
    })

    request.write(jsonData)
    request.end()
    
    //res.send("<h1>Success!<h1>")
    
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port 3003");
});