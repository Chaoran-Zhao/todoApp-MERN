// const UserModel = require('../models/UserModel')
import UserModel from '../models/UserModel.js'


export const Register = async(req,res) => {
  let saveImg = new UserModel ({
    userName: req.body.userName,
    password: req.body.password,
    profileImg: req.file.path,
  })
    // const {
    // userName,
    // password,
    // picture,
    // } =  req.body;
    // const saveImg = UserModel({userName,
    // password,
    // profileImg:picture,})
    // console.log('this is reqbody', req)
    // console.log(req.body.picture)
    // console.log('this is saveImg', saveImg)

  saveImg
    .save()
    .then((res) => {
      console.log("image is saved");
      console.log(res)
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
    res.send('image is saved')
}