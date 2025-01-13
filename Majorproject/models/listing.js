const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: Number,
    description: String,
    location: String,
    image: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwHqBcjpKzRmeS1A9a_I4WEDSMv_e3Fb6uJg&s',
        set: (v) => v === ""? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwHqBcjpKzRmeS1A9a_I4WEDSMv_e3Fb6uJg&s': v
    },
    difficulty: String,
    country: String,
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
