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


const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
  };
  const FILTER_NAMES = Object.keys(FILTER_MAP);
  
  function Home(props) {
  
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const [group, setGroup] = useState('Default');
    const [groups, setGroups] = useState(['Default', 'nDefault'])
    
  
    const filterList = FILTER_NAMES.map(name => (
      <FilterButton
        key={name}
        name={name}
        isPressed={name === filter}
        setFilter={setFilter}
      />
    ));

    const getGroups = async () => {
      const response = await fetch(`http://localhost:3001/user/groups`,
        {
          method: 'GET',
          credentials: 'include'
        });
        const nGroups = await response.json();
    setGroups(nGroups);
  }
  
    const headingText = `${tasks.length} 
                        ${tasks.length !== 1 ? 'tasks' : 'task'} remaining`;
  
    const listHeadingRef = useRef(null);
  
    useEffect(() => {
      handleUseEffect(getCookie, setLoading, getId, getData, setTasks);
      getGroups();
    }, [])
  
  if(loading) {
    return <div>Loading...</div>
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