import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { getTasks, deleteTask, postTask } from './apis';
import './App.css';

function App() {
  const [taskName, setTaskName] = useState('')
  const [tasks, setTasks] = useState({})

  useEffect(() => {
    (async () => {
      const data = await getTasks()
      setTasks(data)
    })()
  }, [])

  const handleSubmit = async () => {
    const reqBody = {
      task_id: uuidv4(),
      task_name: taskName,
    }
    await postTask(reqBody)
    const data = await getTasks()
    setTasks(data)
  }

  const handleDelete = async (task_id) => {
    console.log(task_id)
    await deleteTask(task_id)
    const data = await getTasks()
    setTasks(data)
  }

  return (
    <div className="main">
      <header className="title">
        <h1>Todo Application</h1>
      </header>

      <div className='taskInputContanier'>
        <h3>Add New Task</h3>

        <div className='taskInput'>
          <input
            className='inputBox'
            id='task-name-input'
            type='text'
            placeholder='Enter task name'
            value={taskName}
            onChange={(event) => {
              setTaskName(event.target.value)
            }}
          />
          <button
            onClick={() => {
              handleSubmit()
              setTaskName('')
            }}
            className='button'
          >Add
          </button>
        </div>
      </div>



      {Object.keys(tasks).length === 0 &&
        <div className='tasks'>
          <h2>No pending tasks. Enjoy!!</h2>
        </div>
      }
      <div className='tasks'>
        {
          Object.keys(tasks).map((item) => (
            <div
              key={item}
              className='taskItem'
            >
              <p>{tasks[item].taskName}</p>
              <button onClick={() => handleDelete(item)}>Delete</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
