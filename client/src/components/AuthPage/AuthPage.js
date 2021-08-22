/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';

// eslint-disable-next-line no-unused-vars
const appStyle = {
	height: '250px',
  	display: 'flex'
};

const formStyle = {
    margin: 'auto',
    padding: '10px',
    border: '1px solid #c9c9c9',
    borderRadius: '5px',
    background: '#f5f5f5',
    width: '220px',
  	display: 'block'
};

const labelStyle = {
    margin: '10px 0 5px 0',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '15px',
};

const inputStyle = {
    margin: '5px 0 10px 0',
    padding: '5px', 
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    boxSizing: 'border-box',
    width: '100%'
};

const submitStyle = {
    margin: '10px 0 0 0',
    padding: '7px 10px',
    border: '1px solid #efffff',
    borderRadius: '3px',
    background: '#3085d6',
    width: '100%', 
    fontSize: '15px',
    color: 'white',
    display: 'block'
};

const Field = React.forwardRef(({label, type}, ref) => (
      <div>
        <label style={labelStyle} >{label}</label>
        <input ref={ref} type={type} style={inputStyle} />
      </div>
    ));

const AuthPage = ({setLogging}) => {
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();

    const handleSubmit = e => {
        e.preventDefault();
    }

    const onLogIn = async e => {
        e.preventDefault();
        console.log('Im here')

        const data = {
            email: usernameRef.current.value,
            password: passwordRef.current.value
        };
        const res = await fetch('http://localhost:3001/api/users/login',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({user: {
            email: data.email,
            password: data.password
          }})
        });
        console.log(res)

        // setLogging(false);
        if(res.status === 500){
          await fetch('http://localhost:3001/api/users',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({user: {
            email: data.email,
            password: data.password
          }})
        });

      setLogging(false);
    }else{
      setLogging(false);
    }
        
      }

    return (
      <form style={formStyle} onSubmit={handleSubmit}>
        <Field ref={usernameRef} label="Username:" type="text" />
        <Field ref={passwordRef} label="Password:" type="password" />
        <div>
          <button style={submitStyle} type="logIn" onClick={onLogIn}>Log in</button>
        </div>
      </form>
    );
};

export default AuthPage;
