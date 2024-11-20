const express = require("express");
const app = express();
const path = require("path");

const port = 8080;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.render("home.ejs");
});


app.get("/hello", (req, res) => {
    res.send("hello");
});

app.get("/rolldice", (req, res) => {
    let dicevalue = Math.floor(Math.random() * 6) + 1;
    res.render("rolldice.ejs", { num : dicevalue});
    
});

app.get("/ig/:username", (req, res) => {
    // const followers = ["adam", "kasim", "rahul"];
    // let {username} = req.params;
    // console.log(username);
    let {username} = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    if(data) {
        res.render("instagram.ejs", { data });
        
    }else {
        res.render("error.ejs");
    }
    
    

})

app.listen(port, () => {
    console.log(`listening on port ${port}.`)
});