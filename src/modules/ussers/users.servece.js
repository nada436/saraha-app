import bcrypt, { compare, hash } from 'bcrypt'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'
 
//sign up

import User from "../../db/models/user.model.js"
import { myEmitter } from '../../serves/email/sendemailevent.js'
import { now } from 'mongoose'
import { messagemodel } from './../../db/models/message.model.js';



export const signup=async(req,res,next) => {
    const{name,email,password,cpassword,inputephone}=req.body
   
    if(!(password===cpassword)){
        return next(new Error("conform password and password not match"));
      }
      const user = await User.findOne({email})
      if(user){
        return next(new Error("User already exist"));
      }
      const hashpassword = bcrypt.hashSync(password, +process.env.round);
      const phone=CryptoJS.AES.encrypt(inputephone,process.env.key).toString()
      const token=jwt.sign({email},process.env.key)
      //send mail
      myEmitter.emit("sendemail", {email:email,html:`<a href="http://localhost:3000/confirm/${token}">click me</a>`})
      
      
      await User.create({name,email,hashpassword,phone})
    
      res.json({msg:'user added'})
  
   
   }



//confirm
export const confirm=async(req,res) => {
    const{token}=req.params
    const tokendata=jwt.verify(token,process.env.key)
    if(!tokendata?.email){
       return next(new Error("wronge token"));}
        const user =await User.findOneAndUpdate(
            { email: tokendata.email,confirm: false }, 
            { confirm: true }, 
          ); if(!user){
            return next(new Error("user not found or already confirmed"));
          }
        res.json({msg:'done'})
}

//login
export const login=async(req,res,next) => {
    const{email,password}=req.body
    const user=await User.findOne({email})
    if (!user) {
      return next(new Error("User does not exist"));
  }

    if(!bcrypt.compareSync(password,user.hashpassword)){
      return next(new Error("password id not correct"));
    }
    const token=jwt.sign({email},user.role=='user'?process.env.keyuser:process.env.keyadmin)
    res.json(token)
}





//ةغprofile

export const my_profile=async(req,res) => {
    const user=req.user
    const phone=CryptoJS.AES.decrypt(user.phone,process.env.key).toString(CryptoJS.enc.Utf8)
    const mymessages=await messagemodel.find({user_id:req.user._id})
     const host = req.get('host'); 
     const protocol = req.protocol;
     res.json({...req.user,phone,mymessages,my_profile_url:`${protocol}://${host}/users/share/${req.user._id}`})
}


//update user info (name or phone or both) by owner only

export const update_profile=async(req,res) => {
  const {name}=req.body
  if(req.body?.name){
    await User.updateOne({_id:req.user._id},{name})
  }
    
    if(req.body?.inputephone){
      const {inputephone}=req.body
      const phone=CryptoJS.AES.encrypt(inputephone,process.env.key).toString()
      await User.updateOne({_id:req.user._id},{phone})
    }
    
    res.json({msg:'done'})
}



//re-assign password only by owner and make old token expired

export const re_assign_password=async(req,res,next) => {
  const {oldpassword,password,cpassword}=req.body
 
  const compare=await bcrypt.compare(oldpassword,req.user.hashpassword)
  if( !compare){
   return next(new Error("wronge password"))
  }
  const hashpassword=bcrypt.hashSync(password, +process.env.round);
  await User.updateOne({_id:req.user._id},{hashpassword,updatepasswordat:now()})
  res.json({msg:'done'})
}
//freeze account(soft delete) with owner
export const freeze_account=async(req,res,next) => {
 
  await User.updateOne({_id:req.user._id},{deleteat:now()})
  res.json({msg:'done'})
}

//share profile with  any one can view profile
export const share_account=async(req,res,next) => {
 const{id}=req.params
 
  const user=await User.findOne({_id:id}).select("email phone name")
  if(user?.deleteat){
    return next(new Error("user was deleted"));
  
  }
  res.json(user)
}
