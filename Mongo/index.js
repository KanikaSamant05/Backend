const mongoose= require('mongoose');
// test is a database which contains different collections
// mongoose.connect("mongodb://127.0.0.1:27017/test");

// calling main function using promise (then (if succeed) and catch(if error) method)
main().
    then(()=>{
        console.log("connection successful");
})
   .catch((err)=> console.log(err))
// USING async and await function
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

// SCHEMA:DEFINES ST. OF COLLLECTIONS
const userSchema= new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});
// MODEL: TO CONSTRUCT DOCUMENT FOR COLLECTIONS,here User is a model where we pass collection name (User should be similar to model name)and scema name (userSchema)
const User= mongoose.model("User",userSchema);
// const user2= new User({
//     name:"Eve",
//     email:"eve!yahoo.in",
//     age:45,
// });
// // to save the data in mongodb we use save(), directly it is not accessed but it stored in mongoose to verify it use .load index.js info is shown and then type user1 the whole data of that user along with the random id is shown
// // it return promise so we can use then and catch method
// user2.save().then((res)=>{
//     console.log(res);   
// }).catch((err)=>{
//     console.log(err);
// });

// User.insertMany([
//     {name:"Tony",email:"tony!yahoo.in",  age:45,},
//     {name:"Peter",email:"peter!yahoo.in",  age:43,},
//     {name:"Grace",email:"grace!yahoo.in",  age:40,},
// ]).then((res)=>{
//     console.log(res);
// });

// find() IS USED TO FIND OBJ BUT IT DOESN'T RETURN PROMISE, IT RETURNS OBJECT EVEN AFTER USIND THEN FUNC
// findOne is aso used similarly but returns only one value
// findById is also
// User.find({age:{$gt: 43}}).then((res)=>{
// User.find({_id:'68db61d17444bf588d723ea8'}).then((res)=>{
//       console.log(res);
//     // console.log(res[0].name);
// }).catch((err)=>{
//     console.log(err);
// })

// UPDATE : updateOne , updateMany
// User.updateOne({name:"Adam"},{age:50})
// User.updateMany({age: {$gt: 45}},{age:55})
// HERE NEW IS BYDEFAULT FALSE WE MAKE IT TRUE SO THAT IT RETURNS THE NEWLY ADDDED VALUE IN TERMINAL OTHERWISE IT SHOWS THE OLD VALUE BUT SHOWS THE UPDATED VALUE IN CMD 
// User.findOneAndUpdate({name:"Grace"},{age:35},{new:true})
// .then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })

// DELETE : deleteOne , deleteMany
// User.deleteOne({name:"Tony"})
// TO PRINT THE DELETED DATA IN TERMINAL WE USE findByIdAndDelete and findOneAndDelete
User.findByIdAndDelete("68db61d17444bf588d723ea8")
// User.deleteMany({age: {$lt: 47} })
.then((res)=>{
    console.log(res);  
})
