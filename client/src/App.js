import React, {useState} from 'react';
import './App.css';
import Todo from './components/Todo'
import FilterButton from './components/FilterButton';
import Form from './components/Form';
import {nanoid} from 'nanoid';

function App(props) {

  const [tasks, setTasks] = useState(props.tasks)

  const taskList = tasks.map(task => (
    <Todo 
      id={task.id} 
      name={task.name} 
      completed={task.completed}
      key={task.id}
    />
  ))

  const adddTask = name => {
    const newTask = {
      id: "todo-" + nanoid(),
      name: name,
      completed: false
    };
    setTasks([...tasks, newTask])
  }

  return (
    <div className="todoapp stack-large">
      <h1>Todo-List</h1>
      <Form addTask={adddTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <ul
      className='todo-list stack-large stack-exeption'
      aria-labelledby='list-heading'
      >
        {taskList}
      </ul>
    </div>
  )
    
}

export default App;
