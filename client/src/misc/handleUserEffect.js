const handleUseEffect = async (getCookie, setLoading, getId, getData, setTasks, setlogging, setGroups) => {
  try{
    console.log('asdasd')
    const rawData = await fetch('http://localhost:3001/api/users/current',
    {
      credentials: 'include',
    }
    );
    const data = await rawData.json();
    console.log('im here')
    // eslint-disable-next-line no-underscore-dangle
    getData(data.user._id, setTasks,setGroups);
    setlogging(false);
}catch(e){
    setlogging(true)
  }
}

export default handleUseEffect;