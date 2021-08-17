/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import FilterButton from '../../components/FilterButton';
import Form from '../../components/Form';
import { getCookie } from '../../misc/getCookie';
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
import AuthPage from "../../components/AuthPage";

const appStyle = {
	height: '250px',
  	display: 'flex'
};

const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
  };
  const FILTER_NAMES = Object.keys(FILTER_MAP);
  
  function Home(props) {
  
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(false);
    const [group, setGroup] = useState('Default');
    const [groups, setGroups] = useState(['Default', 'nDefault']);
    const [logging, setLogging] = useState(false);
    
  
    const filterList = FILTER_NAMES.map(name => (
      <FilterButton
        key={name}
        name={name}
        isPressed={name === filter}
        setFilter={setFilter}
      />
    ));
  
    const headingText = `${tasks.length} 
                        ${tasks.length !== 1 ? 'tasks' : 'task'} remaining`;
  
    const listHeadingRef = useRef(null);
  
    useEffect(() => {
      handleUseEffect(getCookie, setLoading, getId, getData, setTasks, setLogging, setGroups);
    }, [])
  
  if(loading) {
    return <div>Loading...</div>
  }

  
  if(logging){
    return (
      <div style={appStyle}>
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
          {filterList}
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
            group)}
        </ul>
      </div>
    )
      
  }

export default Home;