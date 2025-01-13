const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');
const methodOverride = require('method-override');

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
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.send('Hey I am root');
});


//Index Route
app.get('/listings', async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", {allListings});
});

//New Route
app.get('/listings/new', (req, res) => {
    res.render("listings/new.ejs");
});

//Show route
app.get('/listings/:id', async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs", {listing});
});

//Create Route
app.post('/listings', async (req, res) => {
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect(`/listings/${newListing._id}`);
});

//Edit Route
app.get('/listings/:id/edit', async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", {listing});
});

//Update Route
app.put('/listings/:id', async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/listings/${listing._id}`);
});

//Delete Route
app.delete('/listings/:id', async (req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
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



