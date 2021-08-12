const  handleUseEffect = (getCookie, setLoading, getId, getData, setTasks) => {
    if(getCookie("id") === undefined){
      setLoading(true);
      getId();
    }else{
        console.log(`Куки есть ${document.cookie}`);
        getData(getCookie('id'), setTasks);
        setLoading(false);
    }
  }

export default handleUseEffect;