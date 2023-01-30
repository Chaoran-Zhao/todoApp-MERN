// const ToDoModel = require('../models/ToDoModel')
import ToDoModel from '../models/ToDoModel.js'

export const getToDo = async(req,res) => {
    const toDo = await ToDoModel.find();
    res.send(toDo)
}

export const saveToDo = async(req,res) => {
    const { userName, text, description, group, behaviour, status, notification, emergency, time_period, color,attendent } = req.body
    ToDoModel
    .create({ userName, text, description, group, behaviour, status, notification, emergency, time_period,color,attendent })
    .then((data) => {
        console.log("added successfully...");
        console.log(data);
        res.send(data)
    })
}
// edit information
export const updateToDo = async(req,res) => {
    const {_id, text, description, group, behaviour, status, notification, emergency, time_period} = req.body
    ToDoModel
    .findByIdAndUpdate(_id,{ text, description, group, behaviour, status, notification, emergency, time_period })
    .then(()=> res.set(201).send("Update Successfully..."))
    .catch((err)=>{console.log(err)})
}

// update status
export const updateStatus = async(req,res) => {
    const {_id, status} = req.body
    ToDoModel
    .findByIdAndUpdate(_id,{ status })
    .then(()=> res.set(201).send("This to do is completed ..."))
    .catch((err)=>{console.log(err)})
}

// delete todo
export const deleteToDo = async(req,res) => {
    const {_id} = req.body
    ToDoModel
    .findByIdAndDelete(_id)
    .then(()=> res.set(201).send("Delete Successfully..."))
    .catch((err)=>{console.log(err)})
}