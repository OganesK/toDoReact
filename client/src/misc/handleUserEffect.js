const handleUseEffect = async (getCookie, setLoading, getId, getData, setTasks, setlogging, setGroups) => {
  try{const rawData = await fetch('/api/users/current',
  {
    credentials: 'include',
  }
  );
  const data = await rawData.json();
  // eslint-disable-next-line no-underscore-dangle
  getData(data.user._id, setTasks,setGroups);
  setlogging(false);
}catch(e){
    setlogging(true)
  }
}

export default handleUseEffect;