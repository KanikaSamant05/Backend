// templating: it is considered as a format or a template of a page
// EJS is used to create template where if there is a same format of various pages then only 1 template is used by using EJS
// Express directly uses EJS through views folder by default, thus we do not use require for EJS  while we require Express.

const { log } = require("console");
const express = require("express");
const app= express();
const path= require("path");

const port= 3000;
// Initally only html file was used now static helps in using all the files  like css , js alongwith html to run smoothly in a website.
// use method is used to implement static and static uses only public folder with the help of express, similar to views
app.use(express.static(path.join("public")));
// similar to views if we are running server indirectly then path.join is used
app.use(express.static(path.join(__dirname,"public/css")));
app.use(express.static(path.join(__dirname,"public/js/app.js")));

// set is used to fix or set different things here view engine (view is related to templates where view folder stores templates) to ejs
app.set("view engine","ejs");
// path is used to join backed folder to EJSDir so that there is no error if we run server from backend and not directly from EJSDir.
app.set("views",path.join(__dirname,"/views"));

app.get("/",(req,res)=>{
    // render is similar to res.send but render is used for files or big files (or big html files)
    // send is used to get response for string, boolean, array, small html code
    //express by default search for views folder after using render, even if we don't use .ejs extension. So, mentioning directory is not needed.
    res.render("home");
})

app.get("/ig/:username",(req,res)=>{
    const followers=["adam","Sam","Steve","Taylor"];
    let{username} =req.params;
    res.render("instagram.ejs",{username,followers});  
})

app.get("/insta/:username",(req,res)=>{
    let {username}= req.params;
    const instagramD=require("./data.json");
    const data= instagramD[username];
    // console.log(instagramD);  
    // console.log(data);
     if(data){
    res.render("instaData.ejs",{data});
     }else{
        res.render("error.ejs");
     }
})

app.get("/rolldice",(req,res)=>{
    // the data is assumed to be extracted from a database stored in a variable diceVal
    let diceVal= Math.floor(Math.random()*6)+1;
    // res.render("rolldice.ejs");
    // FOR DATABASE METHOD
    // res.render("rolldice",{num:diceVal});
    res.render("rolldice",{diceVal});
})
app.get("/hello",(req,res)=>{
    res.send("hello")
})
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
    
})