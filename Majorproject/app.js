const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');

async function main() {
    await mongoose.connect('mongodb://localhost:27017/wanderlust', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
}

main().then(() => {
    console.log('Connected to MongoDB');

}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

app.set("view engine", "ejs");  
app.set("views", path.join(__dirname, "views"));

app.get('/', (req, res) => {
    res.send('Hey I am root');
});

app.get('/listings', async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", {allListings});
});


// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "Test Listing",
//         description: "This is a test listing",
//         price: 1200,
//         location: "Toronto",
//         country: "Canada",
//     })
//     await sampleListing.save();
//     console.log('Sample was saved');
//     res.send('successful testing');
// });

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});



