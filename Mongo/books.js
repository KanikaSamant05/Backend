const mongoose= require('mongoose');
main().
    then(()=>{
        console.log("connection successful");
})
   .catch((err)=> console.log(err))
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}
const bookSchema = new mongoose.Schema({
    // type is used when we have more than 2 constraints
    title: {
        type:String,
// required defines that the value must be entered and can't be empty
        required: true,
    },
    author:{ 
    type: String,
    },
    price: {
     type:Number,
     min:[1,"Price is too low for Amazon selling"],
    },
});
const book= mongoose.model("Book",bookSchema);
// runValidators is used to check the minimun condn 
book.findByIdAndUpdate("68dc05e860f0d0f753d9596c",{price:-100},{runValidators:true})
// let book1= new book({
//     title: "RD Sharmas Physics",
//     category:"course book",
//     price:700,
//     genre:("Reading","syllabus")
// });
// book1.save()
   .then((res)=>{
    console.log(res);
 })
   .catch((err)=>{
    // console.log(err);
// helps in specifying error and message prints the error
    console.log(err.errors.price.properties.message);
});
