// const mongoose = require('mongoose')
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    text: { // todos
        type: String,
        required: true
    },
    description: {
        type: String,
        require: false
    },
    behaviour: { // Group/Individual
        type: String,
        require: true
    },
    group: { // Group Name/ Group Id
        type: String,
        require: false,
        default: 'none'
    },
    status: { // Pending/Complete
        type: String,
        require: true,
        default: 'Pending',
    },
    notification: { // true/false
        type: Boolean,
        require: true,
        default: false,
    },
    emergency: { // on the scale of 10
        type: Number,
        require: false,
        default: 0,
    },
    time_period: { // [start-dare-time, end-date-time]
        require: true,
        type: Array,
    }

})

// module.exports = mongoose.model('ToDo', todoSchema)
const Todo = mongoose.model('ToDo', todoSchema)
export default Todo;