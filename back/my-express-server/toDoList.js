const express = require("express");
const bodyParser = require("body-parser");
const { static } = require("express");
const date = require(__dirname+"/my_modules/date.js")

const app = express();

let newItems = ["regular"];
let workList = ["work"];

app.use(express.static(process.cwd()+"/front"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    let day = date.getDay();
    res.render("toDoList", {listTitle:day, newItems:newItems});
});

app.post("/", function(req,res){
    let newItem = req.body.newItem;
    if(req.body.list === "Work"){
        workList.push(newItem);
        res.redirect("/work");
    }else{
        newItems.push(newItem);
        res.redirect("/");
    }
    
});

app.get("/work", function(req,res){
    res.render("toDoList", {listTitle:"Work List", newItems:workList});
});

app.listen(process.env.PORT || 3004, function(){
    console.log("Server started on port 3004");
});