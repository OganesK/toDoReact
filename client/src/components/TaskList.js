import { React } from 'react';
import deleteTask from '../misc/deleteTask';
import Todo from './Todo';


const taskList = (tasks, FILTER_MAP, filter, toggleTaskComplited, deleteTask, setTasks, editTask) => (
    tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
    <Todo 
    id={task.id} 
    name={task.name} 
    completed={task.completed}
    key={task.id}
    toggleTaskComplited={() => toggleTaskComplited(task.id, tasks, setTasks)}
    deleteTask={deleteTask}
    editTask={editTask}
    setData={setTasks}
    data={tasks}
    tasks={tasks}
    setTasks={setTasks}
    />
    ))
)

export default taskList;