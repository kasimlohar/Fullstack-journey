const mongoose = require('mongoose');

main().then(res => {
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

const User = mongoose.model("User", userSchema);


User.insertMany([
  {name: "Tony", email: "tony@gmail.com", age: 50},
  {name: "Peter", email: "Peter@gmail.com", age: 19},
  {name: "Bruce", email: "Bruce@gmail.com", age: 45},
]).then((res) => {
  console.log(res);
});



// const user2 = new User({
//   name: "EVe",
//   email: "eve@gmail.com",
//   age: 48,
// });

// user2
// .save()
// .then(res => {
//     console.log(res);
// })
// .catch(err => {
//     console.log(err)
// });