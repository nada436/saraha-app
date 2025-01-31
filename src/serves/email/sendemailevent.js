import  EventEmitter  from "events";
import { sendemail } from "../sendemail.js";

export const myEmitter = new EventEmitter();
myEmitter.on("sendemail", async(data) => {
    const emailsender=await sendemail(data.email,data.html)
    if(emailsender==false){
        return next(new Error("canot send email"));
      }
      
});