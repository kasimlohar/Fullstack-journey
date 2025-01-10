const mongoose = require('mongoose');

main().then(res => {
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}



const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    author: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        enum: ["fiction", "non-fiction", "comedy", "horror"],
        required: true,
    },
});


const book = mongoose.model("Book", bookSchema);


let book1 = new book({
    title: "marvel comics",
    author: "stan lee",
    price: 2000,
    category: "fiction",

})

book1.save().then((res) => { console.log(res) }).catch((err) => {
    console.log(err);
});