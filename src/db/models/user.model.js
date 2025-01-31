import mongoose from "mongoose";



// Define the schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: [true, 'This email already exists'],
  },
  hashpassword: {
    type: String,
   
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    
  },role:{
    type:String,
    enum:['adman','user']
    ,default:'user'
  },
  confirm:{
    type:Boolean,
    default:false
  }
  ,updatepasswordat:Date,deleteat:Date
});

// Define the model
const User= mongoose.model('user', userSchema) 

export default User;

