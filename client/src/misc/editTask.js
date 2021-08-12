const editTask = (id, newName, tasks, setTasks) => {
    const editedTaskList = tasks.map(task => {
      if(id === task.id) {
        return {...task, name: newName};
      }
      return task;
    })
    setTasks(editedTaskList);
  };

export default editTask;