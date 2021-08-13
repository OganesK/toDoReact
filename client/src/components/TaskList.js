import { React } from 'react';
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
    deleteTask={() => deleteTask(task.id, tasks, setTasks)}
    editTask={editTask}
    setData={setTasks}
    data={tasks}
    />
    ))
)

export default taskList;