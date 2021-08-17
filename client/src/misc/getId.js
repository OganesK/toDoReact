const getId = async (setLoading, data) => {
  const result = await fetch('http://localhost:3001/api/users',
  {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {user: {
      email: data.email,
      password: data.password
    }}
  });
  const id = await result.json().token;
    document.cookie = `id=${id}`;
    setLoading(false);
  }

export default getId;