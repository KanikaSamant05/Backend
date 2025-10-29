const { log } = require("console");
const express= require("express");
const app= express();
const port=3100;
const path= require("path");
const { v4:uuidv4 } = require("uuid");


app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts= [
    {
        id:uuidv4(),
        username:"apnacollege",
        content:"I love coding"
    },
    {
        id:uuidv4(),
         username:"CodeWithHarry",
        content:"I love Harry"
    },
    {
        id:uuidv4(),
         username:"ShraddhaKhapra",
        content:"She is a mentor"
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
// getting the requests 
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
});
// adds new post on server
app.post("/posts",(req,res)=>{
    let{username, content}=req.body;
    let id= uuidv4();
    posts.push({id, username,content});
    // console.log(req.body);
    // res.send("working");  
// RDIRECT: IT IS USED TO DIRECTLY (AUTOMATICALLY) GO TO THE URL MENTIONED WITHOUT REFRESHING 
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id }= req.params;
    let post= posts.find((p)=>id === p.id);
    // res.send("working")
    // console.log(post);
// TO SEND INFO TO THE USER
    res.render("show.ejs",{post});
})
app.listen(port,()=>{
    console.log("Listening to port: 3000");
    
})