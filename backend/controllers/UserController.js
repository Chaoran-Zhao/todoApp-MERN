// const UserModel = require('../models/UserModel')
import UserModel from '../models/UserModel.js'
import bcrypt from "bcrypt";

export const Register = async(req,res) => {
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(req.body.password, salt);
  // encrypt password

  let saveImg = new UserModel ({
    userName: req.body.userName,
    password: passwordHash,
    profileImg: req.file.path,
  })

  saveImg
    .save()
    .then((res) => {
      console.log("image is saved");
      console.log(res)
      res.send('image is saved')

    })
    .catch((err) => {
      console.log(err, "error has occurred");
      res.send('error')
    });
    
}

export const Login  = async(req,res) => {
  try{
    const { userName, password } = req.body;
    const user = await UserModel.findOne({userName: userName});
    // user not exist
    if (!user) {
      res.send("User does not exist. ")
    }else{
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {// incorrect password
        res.send("Invalid credentials. ")
      }else{
        res.send("Logged in")
      }
    }
  }catch(err){
    res.send("error occured")
  }
}