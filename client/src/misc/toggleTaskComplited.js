const toggleTaskComplited = async (id, tasks, setTasks) => {
    const updatedTasks = tasks.map(task => {
      if(id === task.id){
        return {...task, completed:!task.completed};
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
      body: JSON.stringify(updatedTasks)
    });
    setTasks(updatedTasks);
  };

export default toggleTaskComplited;