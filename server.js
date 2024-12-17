require("dotenv").config();
const express=require("express");
const app=express();
const mongoose=require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
const db=mongoose.connection
db.on("error",(er)=> console.log(er));
db.on("open",()=> console.log("connected to database"));


// middleware => app.use
app.use(express.json());
const subscriberRouter=require("./routes/subscribers.js");
app.use('/subscribers',subscriberRouter);
app.listen(3000,()=>{
    console.log("server started");
})