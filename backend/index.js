const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoListModel = require('./Models/Todo.js')

mongoose.connect('mongodb://localhost:27017/TodoList')
    .then(() => {
    console.log("Connected");
}).catch((err) => {
    console.log(err);
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/get' , (req, res)=>{
    
    TodoListModel.find()
    .then((result) => {
        res.json(result)
    })
    .catch((err) => {
        res.json(err)
    });
})

app.post('/add' , (req, res)=>{    
    const input = req.body.input;
    if(!input.trim()){
        return res.status(400).json({error: "Task can not be empty"})
    }
    TodoListModel.create({input})
    .then((result) => {        
        res.json(result)
    })
    .catch((err) => {        
        res.json(err)
    });
})

app.put('/update/:id' , (req , res) =>{
    const id = req.params.id;
    const {input,checked} = req.body;

    TodoListModel.findByIdAndUpdate(id ,{input , checked},{new : true})
    .then((result) => {
        res.json(result)
    })
    .catch((err) => {
        res.json(err)
    });
})

app.delete('/delete/:id' , (req, res) => {
    const {id} = req.params;

    TodoListModel.findByIdAndDelete(id)
    .then((result) => {
        res.json(result)
    })
    .catch((err) => {
        res.json(err)
    });
})

app.listen(8001 , () => console.log("Succesfully Running"))