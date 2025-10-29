const mongoose= require("mongoose");
const {Schema} = mongoose;

main().then(()=>
    console.log("connection established"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

// for one to millions of data(i.e. single user posting million of posts)
const userSchema =new Schema({
    username:String,
    email:String,   
});

const postSchema =new Schema({
    content:String,
    likes:Number,
    user:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }
});
const User= mongoose.model("User",userSchema);
const Post= mongoose.model("Post",postSchema);

const addData = async ()=>{
    let user1= new User({
        username: "rahulkumar",
        email:"rahul@gmail.com"
    });

     let user2= new User({
        username: "shreyakumar",
        email:"shreya1@gmail.com"
    });

    let post1= new Post({
        content:"Hello Worls",
        likes:7
    });
     let post2= new Post({
        content:"Bye Bye!",
        likes:7
    });
    post1.user=user1;
    post2.user=user1;
    await user1.save();
    await post1.save();
    await post2.save();
}
addData();

// to find info of post
const getData= async()=>{
    // let result = await Post.findOne({}).populate("user");
    // to print only username and no other details
    let result = await Post.findOne({}).populate("user", "username");

    console.log(result);
}
getData();

// to delete data
// const del = async()=>{
//     await Post.findByIdAndDelete("68e7acec4ba5c2315a80ae60");
//     await User.findByIdAndDelete("68e5f8db4a71e0408db31afd");
// }