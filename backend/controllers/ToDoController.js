const ToDoModel = require('../models/ToDoModel')

module.exports.getToDo = async(req,res) => {
    const toDo = await ToDoModel.find();
    res.send(toDo)
}

module.exports.saveToDo = async(req,res) => {
    const { text, description, group, behaviour, status, notification, emergency, time_period } = req.body

    ToDoModel
    .create({ text, description, group, behaviour, status, notification, emergency, time_period })
    .then((data) => {
        console.log("added successfully...");
        console.log(data);
        res.send(data)
    })
    
}
// edit information
module.exports.updateToDo = async(req,res) => {
    const {_id, text, description, group, behaviour, status, notification, emergency, time_period} = req.body
    ToDoModel
    .findByIdAndUpdate(_id,{ text, description, group, behaviour, status, notification, emergency, time_period })
    .then(()=> res.set(201).send("Update Successfully..."))
    .catch((err)=>{console.log(err)})
}

// update status
module.exports.updateStatus = async(req,res) => {
    const {_id, status} = req.body
    ToDoModel
    .findByIdAndUpdate(_id,{ status })
    .then(()=> res.set(201).send("This to do is completed ..."))
    .catch((err)=>{console.log(err)})
}

// delete todo
module.exports.deleteToDo = async(req,res) => {
    const {_id} = req.body
    ToDoModel
    .findByIdAndDelete(_id)
    .then(()=> res.set(201).send("Delete Successfully..."))
    .catch((err)=>{console.log(err)})
}