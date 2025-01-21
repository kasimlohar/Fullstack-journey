const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));


main().then(() => {
    console.log("Connected to database");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/whatsapp"); 
}

//Index Route
app.get("/chats", asynWrap(async (req, res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", {chats});

}));

// New Route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

// Create Route
app.post("/chats", asynWrap(async (req, res) => {
    let {from, to, message} = req.body;
    let newChat = new Chat({
        from,
        to,
        message,
        created_at: new Date()
    });
    
    newChat
        .save()
        .then(() => {
            console.log("Chat saved");
        })
        .catch(err => {
            console.log(err);
        });
        res.redirect("/chats");
}));

function asynWrap(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    };
}

//NEW - SHOW route
app.get("/chats/:id", asynWrap(async (req, res, next) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    if(!chat) {
        next( new ExpressError("Chat not found", 404))
    }
    res.render("show.ejs", {chat});

}));

// EDIT Route
app.get("/chats/:id/edit", asynWrap(async (req, res) => {
    try {
        let {id} = req.params;
        let chat = await Chat.findById(id);
        res.render("edit.ejs", {chat});
    } catch(err) {
        next(err);
    }
}));



// UPDATE Route
app.put("/chats/:id", asynWrap(async (req, res) => {
    let {id} = req.params;
    let {message: newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, {message: newMsg}, {runValidators: true, new: true});
    console.log(updatedChat);
    res.redirect("/chats");
}));

//Delete Route
app.delete("/chats/:id", asynWrap(async (req, res) => {

    let {id} = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
}));


app.get("/", (req, res) => {
    res.send("Root is working");
});

app.use((err, req, res, next) => {
    console.log(err.name);
    next(err);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    let {statusCode = 500, message = "Something went wrong"} = err;
    res.status(statusCode).send(message);
})

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});

