import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose"

export const conectiondb=async() => {
 await mongoose.connect(process.env.MONGO_ATLAS_URL).then(() => {
    console.log('connecting to db')
  }).catch(() => {
    console.log("can't connect to db")
  })
}

