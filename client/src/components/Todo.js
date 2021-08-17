/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useRef, useEffect } from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';

export default function Todo (props) {

  const [isEditing, setEditing] = useState(false);
  const[newName, setNewName] = useState('');

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
      }

    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    const wasEditing = usePrevious(isEditing);

    const stateChangeHandler = async (id,e) => {
      const editedTaskList = props.data.map(task => {
        if(id === task.id) {
          return {...task, state: e.target.value};
        }
        return task;
        })
      await fetch('http://localhost:3001/user/todoList/update',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedTaskList)
      });
        props.setData(editedTaskList);
      }

    const handleSubmit = async e => {
        e.preventDefault();
        const newList = props.data.reduce((acc, task) => {
          if(task.id === props.id){
            task.name = newName;
          }
          acc.push(task)
          return acc
        }, [])
        props.setData(newList);
        setNewName('');
        setEditing(false);
        
        await fetch(`/user/todoList/update`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newList)
        });
    }

    const handleChange = e => {
        setNewName(e.target.value);
    }
    const editingTemplate = (
        <form
        className="stack-small"
        onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label className="todo-label" htmlFor={props.id}>
              New name for {props.name}
            </label>
            <input
            id={props.id}
            className="todo-text"
            type="text"
            onChange={handleChange}
            ref={editFieldRef}
            />
          </div>
          <div className="btn-group">
            <button
            type="button"
            className="btn todo-cancel"
            onClick={() => setEditing(false)}
            ref={editButtonRef}
            >
              Cancel
              <span className="visually-hidden">renaming {props.name}</span>
            </button>
            <button type="submit" className="btn btn__primary todo-edit">
              Save
              <span className="visually-hidden">new name for {props.name}</span>
            </button>
          </div>
        </form>
      );
      const viewTemplate = (
        <div className="stack-small">
          <div className="c-cb">
              <input
                id={props.id}
                type="checkbox"
                defaultChecked={props.completed}
                onChange={() => props.toggleTaskComplited(props.id)}
              />
              <label className="todo-label" htmlFor={props.id}>
                <strong>Task: </strong>{props.name}
                <strong> State: </strong>{props.state}
              </label>
            </div>
            <div className="btn-group">
              <button
              type="button"
              className="btn"
              onClick={() => setEditing(true)}
              >
                Edit <span className="visually-hidden">{props.name}</span>
              </button>
              <button
                type="button"
                className="btn btn__danger"
                onClick={() => props.deleteTask(props.id, props.tasks, props.setTasks)}
              >
                Delete <span className="visually-hidden">{props.name}</span>
              </button>
              <NativeSelect id="select" onChange={ (e) => 
                { 
                  stateChangeHandler(props.id, e);
                }}>
                {props.states.map(state => (
                  <option value={state}>{state}</option>
                ))}
              </NativeSelect>
            </div>
        </div>
      );

      useEffect(() => {
        if (!wasEditing && isEditing) {
            editFieldRef.current.focus();
          }
          if (wasEditing && !isEditing) {
            // editButtonRef.current.focus();
          }
        }, [wasEditing, isEditing]);

    return <li className='todo'>{isEditing ? editingTemplate : viewTemplate}</li>;
}