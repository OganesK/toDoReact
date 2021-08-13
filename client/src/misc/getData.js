const getData = async (id, setTasks) => {
    const response = await fetch(`http://localhost:3001/user/todoList`,
    {
      method: 'GET',
      credentials: 'include'
    });
    const Tasks = await response.json();
    setTasks(Tasks.todoList);
  }

export default getData; 