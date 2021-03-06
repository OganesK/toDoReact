const getData = async (id, setTasks, setGroups) => {
    const response = await fetch(`http://localhost:3001/user/todoList`,
    {
      method: 'GET',
      credentials: 'include'
    });
    const res = await response.json();
    setTasks(res.todoList);
    setGroups(res.groups)
  }

export default getData; 