// const UserModel = require('../models/UserModel')
import UserModel from '../models/UserModel.js'
import bcrypt from "bcrypt";
// encrypt password
import jwt from "jsonwebtoken"; 
// token

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
    .then(() => {
      console.log("image is saved");
      res.send('image is saved')
    })
    .catch((err) => {
      console.log(err, "error has occurred");
      res.send(err.message);
    });   
}

export const Login  = async(req,res) => {
  console.log('herhe',req.body)
  try{
    const { userName, password } = req.body;
    
    const user = await UserModel.findOne({userName: userName});
    console.log(user)
    // user not exist
    if (!user) {
      res.send("User does not exist. ")
    }else{
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {// incorrect password
        res.send("Invalid credentials. ")
      }else{      
        const token = jwt.sign({ id: res.userName }, 'shhhhh')
        delete res.password
        res.status(200).json({ token, response:"logged-in" });
      }
    }
  }catch(err){
    res.send("error occured")
  }
}


export const getUser = async (req, res) => {
  try {
    const userName  = req.params['name'];
    console.log(req.params['name'])
    console.log(userName)
    const user = await UserModel.findOne({userName: userName});
    console.log(user)
    res.status(200).json(user);
  } catch (err) {
    res.send("error occured")
  }
};
