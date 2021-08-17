const handleUseEffect = async (getCookie, setLoading, getId, getData, setTasks, setlogging, setGroups) => {
  try{const rawData = await fetch('http://localhost:3001/api/users/current',
  {
    credentials: 'include',
  }
  );
  const data = await rawData.json();
  getData(data.user._id, setTasks,setGroups);
  setlogging(false);
}catch(e){
    setlogging(true)
  }
}

export default handleUseEffect;