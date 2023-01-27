// const mongoose = require('mongoose')
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   userName: { // todos
        type: String,
        require: true
    },
    password: {
        type: String,
        require: false
    },
    profileImg: {
        type: String,
        require: false,
        default: ""
    }
    

})

const User = mongoose.model('user', userSchema)
export default User;