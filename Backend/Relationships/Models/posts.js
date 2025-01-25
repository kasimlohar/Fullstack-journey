const mongoose = require('mongoose');
const {Schema} = mongoose;

main().then(() => console.log("Connection Successful")).catch(err => console.log(err));

async function main() {    
    await mongoose.connect('mongodb://127.0.0.1:27017/relationdemo')
}

const userSchema = new Schema({
    username: String,
    email: String,

})

const postSchema = new Schema({
    content: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
})

const User = mongoose.model("User", userSchema)
const Post = mongoose.model("Post", postSchema)

const addData = async () => {
    // let user1 = new User({
    //     username: "rahulkumar",
    //     email: "rahul@gmail.com",
    // })

    let user1 = await User.findOne({username: "rahulkumar"})


    let post2 = new Post({
        content: "Bye Bye",
        likes: 8,
    })

    post2.user = user1;

    // await user1.save();
    await post2.save();
}

addData()