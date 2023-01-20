const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")

const routes = require('./routes/ToDoRoute')

require('dotenv').config()

const app = express()
const Port = process.env.port || 5000

app.use(express.json())
app.use(cors())

app.listen(Port,()=>{
    console.log(`Listening on : ${Port}`)
})


mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>console.log('Connected to MongoDb'))
    .catch((err)=>console.log(err,'error occur'))

    
app.use(routes)