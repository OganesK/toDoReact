const deleteTask = async (id, tasks, setTasks) => {
    const remainingTasks = tasks.filter(task => id !== task.id);
    await fetch('/user/todoList/update',
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(remainingTasks)
    });
    setTasks(remainingTasks);
  };

export default deleteTask;