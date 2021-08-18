import React, { useState, useRef, useEffect } from "react";
import Form from '../../components/Form';
import editTask from '../../misc/editTask';
import deleteTask from '../../misc/deleteTask';
import toggleTaskComplited from "../../misc/toggleTaskComplited";
import addTask  from '../../misc/addTask';
import getId from '../../misc/getId';
import handleUseEffect from '../../misc/handleUserEffect';
import getData from '../../misc/getData';
import taskList from "../../components/TaskList";
import './Home.css'
import TaskGroupSelector from '../../components/TaskGroupSelector'
import AuthPage from "../../components/AuthPage/AuthPage";
import FilterList from "../../components/FilterList";

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const  Home = () => {

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [group, setGroup] = useState('Default');
  const [groups, setGroups] = useState(['Default', 'nDefault']);
  const [logging, setLogging] = useState(false);
  const STATES = ['To-Do', 'In progress', 'Complited']
  const listHeadingRef = useRef(null);

  const headingText = `${tasks.length} 
                      ${tasks.length !== 1 ? 'tasks' : 'task'} remaining`;

  useEffect(() => {
    handleUseEffect(getId, getData, setTasks, setLogging, setGroups);
  }, [])

  if(logging){
    return (
      <div id='loggingPage'>
        <AuthPage setLogging={setLogging}/>
      </div>
    );
  }

  return (
    <div className="todoapp stack-large">
      <h1>Todo-List</h1>
      <TaskGroupSelector groups={groups} setGroup={setGroup} curGroup={group} setGroups={setGroups}/>
      <Form addTask={addTask} tasks={tasks} setTasks={setTasks} group={group}/>
      <div className="filters btn-group stack-exception">
        <FilterList filter={filter} setFilter={setFilter} FILTER_MAP={FILTER_MAP}/>
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
      className='todo-list stack-large stack-exeption'
      aria-labelledby='list-heading'
      >
        {taskList(tasks,
          FILTER_MAP,
          filter,
          toggleTaskComplited,
          deleteTask,
          setTasks,
          editTask,
          group,
          STATES)}
      </ul>
    </div>
  )
    
}

export default Home;