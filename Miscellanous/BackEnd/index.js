const express= require("express");
const app= express();
const port= 8080;

// this is for url encoded data
app.use(express.urlencoded({extended:true}));
// parsing is done json data
// app.use(express.json);

app.get("/register",(req,res)=>{
    let {user,password}=req.query;
    res.send(`standard GET response, Welcome ${user}`);
})
app.post("/register",(req,res)=>{
    // it will show undefined because express is not able to understand the data, thus parsing is done to convert data into readable format for express. For this, urlencoded is used at the top of the code
    console.log(req.body);
    let {user,password}=req.body;
    res.send(`standard POST response ${user} and ${password}`);
})
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
    
})