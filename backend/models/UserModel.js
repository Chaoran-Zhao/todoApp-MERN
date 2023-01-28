// const mongoose = require('mongoose')
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   userName: { 
        type: String,
        required: true,
        min: 2,
        max: 30,
        unique: true,
    },
    password: {
        type: String,
        required: false,
        min: 5,
    },
    profileImg: {
        type: String,
        required: false,
        default: ""
    }
    

})

const User = mongoose.model('user', userSchema)
export default User;