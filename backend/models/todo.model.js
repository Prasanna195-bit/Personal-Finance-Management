/*
Todo

An Entry in the To-do List

Properties:-

todoDescription
*/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    todoDescription: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    todoResponsible: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    todoPriority: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    todoCompleted: {
        type: Boolean,
        required: true,
        unique: false
    }
},
    { timestamps: true })

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;