const express=require("express");
const router=express.Router();
const Subscriber=require("../models/subscriber.js");
const subscriber = require("../models/subscriber.js");

// whenever accesing the database then use async await

// getting all
router.get("/",async(req,res)=>{
    
    try{
        const subscriber=await Subscriber.find();
        res.send(subscriber);
    }
    catch(err){
        res.status(500);
        res.json("err.message");
    }
})
// getting one -> parameter is used in this
router.get("/:id",getSubscriber,(req,res)=>{

    res.send(res.subscriber.name);
})
// creating one
router.post("/",async(req,res)=>{    
    const subscriber=new Subscriber({
        name:req.body.name,
        subscriberToChannel:req.body.subscriberToChannel

    })
    try{
        const newSubscriber=await subscriber.save();
        res.status(201).json(newSubscriber);
    }
    catch(err){
        res.status(400).json(err.message);
    }
})
// updating one put updates all although patch updates only specific
router.patch("/:id",getSubscriber,async(req,res)=>{
    if(req.body.name != null){
        res.subscriber.name=req.body.name

    }
    if(req.body.subscriberToChannel!=null){
        res.subscriber.subscriberToChannel=req.body.subscriberToChannel

    }
    try{
        const updatedSubscriber=await res.subscriber.save()
        res.json({msg:"successfully updated"})
    }
    catch(err){
        res.status(400).json({msg:"can not update sorry"})
    }
})
// deleting one
router.delete("/:id",getSubscriber,async(req,res)=>{
    try{
        await res.subscriber.deleteOne()
        res.json({message:"deleted successfully"})
    }
    catch(err){
        res.status(500).json({"msg":"cannot find"})
    }
})

async function getSubscriber(req,res,next){
    let subscriber
    try{
        subscriber=await Subscriber.findById(req.params.id);
        if(subscriber==null){
           return  res.status(404).json("cannot find subscriber");
        }
    }
    catch(err){
        return res.status(500).json({"message":"cannot find s"})
    }
    res.subscriber=subscriber
    next()
}

module.exports=router