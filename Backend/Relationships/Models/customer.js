const mongoose = require('mongoose');
const {Schema} = mongoose;

main().then(() => console.log("Connection Successful")).catch(err => console.log(err));

async function main() {    
    await mongoose.connect('mongodb://127.0.0.1:27017/relationdemo')
}

const orderSchema = new Schema({
    item: String,
    price: Number,

})

const customerSChema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order",
        }
    ]
})

const Order = mongoose.model("Order", orderSchema)
const Customer = mongoose.model("Customer", customerSChema)



const findCustomer = async () => {
    // let cust1 = new Customer({
    //     name: "Rahul Kumar"
    // })

    // let order1 = await Order.findOne({item: "Burger"})
    // let order2 = await Order.findOne({item: "Chao"})

    // cust1.orders.push(order1)
    // cust1.orders.push(order2)

    // let result = await cust1.save();
    // console.log(result)

    let result = await Customer.find({}).populate("orders");
    console.log(result[0])
};

findCustomer();



// const addOrders = async () => {
//     let res = await Order.insertMany([
//         {item: "Samosa", price: 12},
//         {item: "Burger", price: 32},
//         {item: "Chao", price: 22},
//     ])
//     console.log(res)
// }

// addOrders();