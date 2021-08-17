const editTask = async (id, newName, tasks, setTasks) => {
  const editedTaskList = tasks.map(task => {
    if(id === task.id) {
      return {...task, name: newName};
    }
    return task;
  })
  
  await fetch('http://localhost:3001/user/todoList/update',
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedTaskList)
    });
  setTasks(editedTaskList);
  };

export default editTask;