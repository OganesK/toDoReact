/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {React, useState} from 'react';
import addTask from '../misc/addTask';

const Form = (props) => {

    const [name, setName] = useState('')

    const handleChange = e => {
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try{
        addTask(name, props.tasks, props.setTasks, props.group);
        }catch(error){console.log(error)}
        setName('');
    }

    return (<form onSubmit={handleSubmit}>
        <h2 className='label-wrapper'>
            <label htmlFor='new-todo-input' className='label__lg'>
                What needs to be done?
            </label>
        </h2>
        <input
            type='text'
            id='new-todo-input'
            className='input input__lg'
            name='text'
            autocomplite='off'
            value={name}
            onChange={handleChange}
        />
        <button type='submit' className='btn btn__primary btn__lg'>
            Add
        </button>
    </form>)
};

export default Form;