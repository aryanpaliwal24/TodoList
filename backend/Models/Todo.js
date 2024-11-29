const mongoose = require('mongoose');

const TodoListSchema = new mongoose.Schema({
    input: { type: String , required:true },
    checked: {type : Boolean , default: false}
})

const TodoListModel = mongoose.model('TodoItems', TodoListSchema)
module.exports = TodoListModel;