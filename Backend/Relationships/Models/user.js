const mongoose = require('mongoose');
const {Schema} = mongoose;

main().then(() => console.log("Connection Successful")).catch(err => console.log(err));

async function main() {    
    await mongoose.connect('mongodb://127.0.0.1:27017/relationdemo')
}

const userSchema = new Schema({
    username: String,
    addresses: [
        {
            _id: false,
            location: String,
            city: String,
        },
    ],
})

const User = mongoose.model("User", userSchema);

const addUser = async() => {
    let user1 = new User({
        username: "SherLockHoles",
        addresses: [
            {
            location: "2212 Baker Street",
            city: "London",
            },
        ],
    })

    user1.addresses.push({location: "P32 WallStreet", city: "london"});
    let result = await user1.save();
    console.log(result);
}

addUser();