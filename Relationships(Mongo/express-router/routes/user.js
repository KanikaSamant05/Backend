const express= require('express');
const router = express.Router();

// for users
// we will seperate the requests in different files based on their paths then replace app with router.
// router has all the methods (get, post etc)  similar to app object
// we can remove user from path becoz we had defined that the path will be taken from user file in app.js file 
router.get("/", (req,res)=>{
    res.send("Get for users");
})

router.get("/:id", (req,res)=>{
    res.send("Get for user's id");
})

router.post("/", (req,res)=>{
    res.send("post for users");
})

router.delete("/:id",(req,res)=>{
    res.send("Delete for user id");
})

module.exports = router;
