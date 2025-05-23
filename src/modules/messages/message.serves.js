import { messagemodel } from "../../db/models/message.model.js"
import { mongoose } from 'mongoose';

//send message to user by his id (any one allow)
export const send_message=async(req,res,next) => {
     const{content}=req.body
    const User_id = new mongoose.Types.ObjectId(req.params.user_id)
    const user=await messagemodel.create({content,user_id:User_id})
     res.json({message:'message sent'})
   }

//see user's recive messages only he owner can see them
export const recive_messages=async(req,res,next) => {
   
   const user=await messagemodel.find({user_id:req.user._id})
res.json(user)
  }


