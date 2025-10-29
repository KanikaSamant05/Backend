// it helps in maintaining the st. of our file i.e. if there are large no. of file or folders than it is difficult to understand. Express-router makes it easy to understand 
const express= require('express');
const app= express();
const users= require("./routes/user.js");
const posts= require("./routes/post.js");

app.get("/", (req,res)=>{
    res.send("Hi, root");
})

// used when express- router is implemented, here this '/' also commmon path is mostly preferred( /users) will match the path from user.js file then use it to the page
app.use("/users",users);
app.use("/posts",posts);


app.listen(3000,()=>{
    console.log("port no 3000 working");
    
})