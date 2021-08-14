import {nanoid} from 'nanoid';

const addTask = async (name, tasks, setTasks, group) => {
    try{const newTask = {
      id: "todo-" + nanoid(),
      name: name,
      completed: false,
      group: group
    };
    const newTaskList = [...tasks, newTask];
    await fetch('http://localhost:3001/user/todoList/update',
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTaskList)
    });
    setTasks(newTaskList)}catch(e){
      console.log(e)
    }

  }

export default addTask;