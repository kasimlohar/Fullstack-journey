const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/Activity.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        await Listing.insertMany(data);
        console.log('Data was initialized');
    } catch (err) {
        console.log('Error initializing data:', err);
    }
};

initDB();
