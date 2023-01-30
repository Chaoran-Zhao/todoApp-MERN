// const mongoose = require('mongoose')
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: false,
    },
    text: { // todos
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    status: { // Pending/Complete
        type: String,
        required: true,
        default: 'Pending',
    },
    notification: { // true/false
        type: Boolean,
        required: true,
        default: false,
    },
    emergency: { // on the scale of 10
        type: Number,
        required: false,
        default: 0,
    },
    time_period: { // [start-dare-time, end-date-time]
        required: true,
        type: Array,
    },
    color: {
        required: false,
        type: String,
    },
    attendent: {
        type: Array,
        required: false
    }
})

// module.exports = mongoose.model('ToDo', todoSchema)
const Todo = mongoose.model('ToDo', todoSchema)
export default Todo;