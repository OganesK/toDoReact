const getId = async (setLoading) => {
    const response = await fetch('http://localhost:3001/auth/register')
    const id = await response.text()
    document.cookie = `id=${id}`;
    setLoading(false);
  }

export default getId;