import mongoose from "mongoose"

export const conectiondb=() => {
  mongoose.connect(process.env.mongoo_atles_url).then(() => {
    console.log('connecting to db')
  }).catch(() => {
    console.log('cant connect to db')
  })
}