// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require("cors")
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";

import bodyParser from "body-parser";

import { fileURLToPath } from "url";
import TodoRoutes from './routes/ToDoRoute.js';
import UserRoutes from './routes/UserRoute.js';
import { Register } from "./controllers/UserController.js";
import UserModel from './models/UserModel.js'
import path from "path";
// const TodoRoutes = require('./routes/ToDoRoute')
// const UserRoutes = require('./routes/UserRoute')

// require('dotenv').config()
// dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
const app = express()
const Port = process.env.port || 5000

app.use(express.json())

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.urlencoded({extended: true}))
app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}
))
app.use("/public/assets", express.static(path.join(__dirname, "public/assets")));


app.listen(Port,()=>{
    console.log(`Listening on : ${Port}`)
})

const url = process.env.MONGOdB_URL
mongoose.set('strictQuery',true)

mongoose
    .connect(url, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true, 
    })
    .then(()=>console.log('Connected to MongoDb'))
    .catch((err)=>console.log(err,'error occur'))



/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname);
  },
});    
const upload = multer({ storage });
// app.post("/auth/register", upload.single("testImg"),(req, res) => {
//   const saveImage =  UserModel({
//     userName: req.body.userName,
//     password: req.body.password,
//     profileImg: {
//       data: fs.readFileSync("public/assets/" + req.file.filename),
//       contentType: "image/png",
//     },
//   });
//   saveImage
//     .save()
//     .then((res) => {
//       console.log("image is saved");
//       console.log(saveImage)
//     })
//     .catch((err) => {
//       console.log(err, "error has occur");
//     });
//     res.send('image is saved')
// }); 
app.post("/auth/register", upload.single("picture"),Register);
app.use("/todos", TodoRoutes)
app.use("/auth", UserRoutes)