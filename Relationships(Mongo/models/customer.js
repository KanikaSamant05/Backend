const mongoose= require("mongoose");
const {Schema} = mongoose;

main().then(()=>
    console.log("connection established"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

// for one to many(eg a user ordering multiple items)
const orderSchema= new Schema({
    item:String,
    price:Number,
});
// here type is defined because the data will be found based on type(here ObjectId)  where reference(ref ) is Order schema
const customerSchema= new Schema({
    name:String,
    orders:[
        {
            type:Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
});

// MONGOOSE MIDDLEWARE : to delete user with its data from other Schema related to that user. This is done by using PRE and POST func. PRE deletes data initially after extecution and post deletes after.
// Normally data is not deleted from other schemas, these middleware 

// customerSchema.pre("findOneAndDelete", async(data)=>{
//     console.log(data);
// })


customerSchema.post("findOneAndDelete", async(customer)=>{
    if(customer.orders.length){
        // $in is used to delete with condn from mongoose
      let result= await Order.deleteMany({_id: {$in: customer.orders}});
    console.log(result);
    }
});

const Order= mongoose.model("Order",orderSchema);
const Customer= mongoose.model("Customer",customerSchema);

const addCustomer = async()=>{
    let cust1= new Customer({
        name:"Rahul Kumar",
    });
    let order1= await Order.findOne({item:"Chips"});
    let order2= await Order.findOne({item:"Chocolate"});
// here we can also push based on object Id also. for now it has passed on the complete object of chips and chocolate
    cust1.orders.push(order1);
    cust1.orders.push(order2);
    let result= await cust1.save();
    // console.log(result);

// here even if mongoose in terminal shows the info of whole object but mongosh will show only object Id by default i.e. after going to database it only shows ID. 
// to verify this now output in terminal will show only objectID
// let ans = await Customer.find({});
// console.log(ans);

let newCust = new Customer({
    name:"Karan Arjun"
});

let newOrder= new Order({
    item: "Burger",
    price: 100,
});
newCust.orders.push(newOrder);
await newOrder.save();
await newCust.save();
console.log("added new customer");

}
// addCustomer();

// FOR ONE TO MANY USING populate method
// .populate("") , inside the commas reference table is used from where the exact info will find here orders Schema is a method or function which returns the whole info of orders instead of returning the object ID 
const findCustomer =async()=>{
    let result = await Customer.find({}).populate("orders");
    // console.log(result);
    console.log(result[0]);
    
};
// findCustomer();

const addOrders= async()=>{
    let res= await Order.insertMany([
        {item:"Samosa", price:12},
        {item:"Chips", price:10},
        {item:"Chocolate", price:40},
    ]);
    console.log(res);
};
// addOrders();

const delCust= async()=>{
     let data= await Customer.findByIdAndDelete("68eb1958f0fa884815dc9421");
     console.log();
};
delCust();