const express = require('express');
const app = express();

console.dir(app);

let port = 3000; //8080

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
} )

app.get("/:username/:id", (req, res) => {
    let { username, id} = req.params;

    res.send(`welcome to pagr of ${username}`);
});


app.get("/search", (req, res) => {
    console.log(req.query);

    res.send("no result");
});


// app.get("/apple", (req, res) => {
//     res.send("you contacted apple path");
// });

// app.get("/orange", (req, res) => {
//     res.send("you contacted orange path");
// });

// app.get("*", (req, res) => {
//     res.send("this path not exist");
// }); // all the path except define path


// app.post("/", (req, res) => {
//     res.send("you send a post request");
// });

// app.use((req, res) => {
//     console.log("repuest received");
//     // res.send("this is a simple response");
//     // res.send({
//     //     name: "apple",
//     //     color: "red",

//     // });
//     // let code = "<h1>Fruits</h1> <ul><li>apple</li><li>mango</li><li>banana</li></ul>";
//     // res.send(code);
// });