import React, { useState, useRef, useEffect } from "react";
import './App.css';
import Todo from './components/Todo'
import FilterButton from './components/FilterButton';
import Form from './components/Form';
import {nanoid} from 'nanoid';
import { getCookie } from './misc/getCookie'

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const getData = async id => {
  const response = await fetch(`http://localhost:3001/getToDo?${id}`)
  const Tasks = await response.text()
  console.log(Tasks)
  return Tasks
}

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {

  const [tasks, setTasks] = useState(getData());
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const editTask = (id, newName) => {
    const editedTaskList = tasks.map(task => {
      if(id === task.id) {
        return {...task, name: newName};
      }
      return task;
    })
    setTasks(editedTaskList);
  };

  

  const deleteTask = id => {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  };

  const toggleTaskComplited = id => {
    const updatedTasks = tasks.map(task => {
      if(id === task.id){
        return {...task, complited:!task.complited};
      }
      return task;
    })
    setTasks(updatedTasks);
  };

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo 
      id={task.id} 
      name={task.name} 
      completed={task.completed}
      key={task.id}
      toggleTaskComplited={toggleTaskComplited}
      deleteTask={deleteTask}
      editTask={editTask}
    />
    ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const adddTask = name => {
    const newTask = {
      id: "todo-" + nanoid(),
      name: name,
      completed: false
    };
    setTasks([...tasks, newTask])
  }

  const headingText = `${taskList.length} 
                      ${taskList.length !== 1 ? 'tasks' : 'task'} remaining`;

  const listHeadingRef = useRef(null);

  const prevTaskLength = usePrevious(tasks.length);

  const getId = async () => {
    const response = await fetch('http://localhost:3001/newUser')
    const id = await response.text()
    document.cookie = `id=${id}`;
    setLoading(false);

  }

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  useEffect(() => {
    if(getCookie("id") === undefined){
      setLoading(true);
      getId();
    }else{
        // eslint-disable-next-line no-console
        console.log(`Куки есть ${document.cookie}`);
        setLoading(false);
    }
}, [])

if(loading) {
  return <div>Loading...</div>
}
  
  return (
    <div className="todoapp stack-large">
      <h1>Todo-List</h1>
      <Form addTask={adddTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
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
