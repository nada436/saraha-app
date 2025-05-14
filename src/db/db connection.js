import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose"

export const conectiondb=async() => {
 await mongoose.connect(process.env.connect).then(() => {
    console.log('connecting to db')
  }).catch(() => {
    console.log("can't connect to db")
  })
}

