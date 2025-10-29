const mongoose=require("mongoose");
const Chat= require("./models/chat.js");
main().then(()=>{
    console.log("connection successful");    
})
.catch((err)=>console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatApp')
}

let allChats=[{
    from: "Neha",
    to:"Priya",
    msg:"send me your exam sheets",
    created_at: new Date(),
},
{
    from: "Anita",
    to:"Ramesh",
    msg:"Bring me some fruits",
    created_at: new Date(),
},
{
    from: "Amit",
    to:"Ahana",
    msg:"All the best",
    created_at: new Date(),
},
{
    from:"Tony",
    to:"Peter",
    msg:"send me your address",
    created_at: new Date(),
},
];
Chat.insertMany(allChats);