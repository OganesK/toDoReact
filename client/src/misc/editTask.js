const editTask = (id, newName, tasks, setTasks) => {
  console.log(tasks)
    const editedTaskList = tasks.map(task => {
      if(id === task.id) {
        return {...task, name: newName};
      }
      return task;
    })
    setTasks(editedTaskList);
    console.log(editedTaskList)
  };

export default editTask;