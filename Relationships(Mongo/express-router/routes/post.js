const express= require('express');
const router = express.Router();
// for posts
router.get("/", (req,res)=>{
    res.send("Get for posts");
})

router.get("/:id", (req,res)=>{
    res.send("Get for posts's id");
})


router.post("/", (req,res)=>{
    res.send("post for posts");
})

router.delete("/:id",(req,res)=>{
    res.send("Delete for posts id");
})
module.exports=router;