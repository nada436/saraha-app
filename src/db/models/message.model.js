import mongoose from "mongoose"
const messageschema=new mongoose.Schema({
    content:{
        type:String,
        minlength:3,
        
    },user_id:{type:mongoose.Schema.Types.ObjectId},
},{timestamps:true,autoCreate:true})

export const messagemodel= mongoose.model('message',messageschema)||mongoose.model.message