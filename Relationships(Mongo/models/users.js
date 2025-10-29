const mongoose= require("mongoose");
const {Schema} = mongoose;

main().then(()=>
    console.log("connection established"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

// method to establish relationship for one to few relational method, where one user will have more than one data(eg user students can study more than 1 subject {data}). Here whole address is stored inside user  
const userSchema = new Schema({
    username: String,
    addresses:[
        {           
        // this makes sure that id provided by mongoose (automatically) to the addresses will not be provided i.e. individual id will not be mentioned to each address given to the user 
        //    _id: false,
            location:String,
            city:String,
        },
    ],
});
const User= mongoose.model("User", userSchema);
const addUsers = async()=>{
    let user1 = new User({
        username: "Sherlock Homes",
        addresses:[
            {
            location:"22 1B Baker Street",
            city:"London",
        },
    ],
    });
    // other method to insert address
    user1.addresses.push({location:"P32 Wallstreet",city: "London"});
    let result = await user1.save();
    console.log(result);
};
addUsers();

