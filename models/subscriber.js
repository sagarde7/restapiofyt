const mongoose=require("mongoose");
const { subscribe } = require("../routes/subscribers");

const subschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    subscriberToChannel:{
        type:String,
        required:true
    },
    subscribeDate:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Subscriber",subschema)