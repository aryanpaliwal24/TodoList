import React, { useState , useEffect } from 'react'
import axios from 'axios';
import { RiCheckboxCircleLine } from "react-icons/ri";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";


export const Todo = () => {
  const [input , setInput]= useState('')
  const [task , setTask] = useState([])
  const [ update , setUpdate] = useState(null)

  useEffect(() => {
    fetchData();
  },[])

  const fetchData = () =>{
    axios.get('http://localhost:8001/get')
    .then((result) => {
      setTask(result.data);
    }).catch((err) => {
      console.log(err)
    });
  }

  const handleSubmit = (e , id) => {    
    e.preventDefault();
    if (!input.trim()) return;
    if(update){
      axios.put("http://localhost:8001/update/"+update ,{input , checked:false})
      .then(() => {
        setInput('')
        setUpdate(null)
        fetchData();
      }).catch((err) => {
        console.log(err)
      });
    }
    else {      
      axios.post("http://localhost:8001/add",{input})
      .then((res) => {     
        setInput('')
        fetchData();
      })
      .catch((err) => {
        console.log(err)
      });
    }
  }

  const handleEdit = (id ,currEle) => {
      setUpdate(id)
      setInput(currEle)
  }

  const handleDelete = (id) => {
    axios.delete('http://localhost:8001/delete/'+id)
    .then(() => {
      fetchData();
    }).catch((err) => {
      console.log(err)
    });
  }

  const handleCheck = (id) => {
    const updatedTask = task.map((todo) => {
      if (todo._id === id) {
        const updatedTodo = { ...todo , checked:!todo.checked};

        axios.put("http://localhost:8001/update/"+id , updatedTodo)
      .then(() => {
        fetchData();
      }).catch((err) => {
        console.log(err)
      });
      return updatedTodo;
      }
      return todo;
    })
    setTask(updatedTask)
  }

  return (
    <div>
      <header>
        <h2>Todo List</h2>
      </header>
      <div className="main">
        <div className="input-container">
          <form onSubmit={handleSubmit} className='todo-form'>
            <input type='text' value={input} placeholder='Enter Task Name' onChange={(e) => setInput(e.target.value)} />
          </form>
        </div>
        <div className='items-container'>
          <ul>
            {task.map((todo) => (
              <li key={todo._id}>
                <div className="list">
                <button className='checked' 
                onClick={() => handleCheck(todo._id)}
                >
                  {todo.checked ? (<RiCheckboxCircleLine size={20}/> ): (<RiCheckboxBlankCircleLine size={20}/>)}
                </button>
                <div>
                {update === todo._id ? (
                  <input type='text'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  ) : (todo.input)}
                </div>
                </div>
                <div className="list-btn">
                  <button onKeyDown={"Enter"} onClick={() => handleEdit(todo._id, todo.input)}><CiEdit size={20}/>
                  </button>
                  <button onClick={() => handleDelete(todo._id)}><TiDeleteOutline size={20}/>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
