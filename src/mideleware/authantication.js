import User from "../db/models/user.model.js"
import jwt from 'jsonwebtoken'
export const authantcation=async(req,res,next) => {
    const{auth}=req.headers
    if(auth?.email){
        return next(new Error("correct token requard"));
    }   const [role, token] = auth.split(' ');
        const tokendata=jwt.verify(token,role=='user'?process.env.keyuser:process.env.admin)    //obj of payload 
        const user=await User.findOne({email:tokendata.email}).select("-hash").lean()
        req.user=user
        if(!user){
            return next(new Error("something happen wrong  itis not valid token"));
        }
        if(user?.updatepasswordat){
           
        if(tokendata.iat<parseInt(user.updatepasswordat.getTime() / 1000, 10)){
            return next(new Error("token expired"));

        }}
        if(user?.deleteat){
                return next(new Error("user was deleted"));
    
            }
        
        next()
}



