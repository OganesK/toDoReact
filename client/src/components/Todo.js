/* eslint-disable no-param-reassign */
import React, { useState, useRef, useEffect } from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';

export default function Todo ({deleteTask, name, id, setData, data, completed,
                              state, tasks, setTasks, states, toggleTaskComplited}) {

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

    const stateChangeHandler = async (taskId,e) => {
      const editedTaskList = data.map(task => {
        if(taskId === task.id) {
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
        setData(editedTaskList);
      }

    const handleSubmit = async e => {
        e.preventDefault();
        const newList = data.reduce((acc, task) => {
          if(task.id === id){
            task.name = newName;
          }
          acc.push(task)
          return acc
        }, [])
        setData(newList);
        setNewName('');
        setEditing(false);
        
        await fetch(`http:localhost:3001/user/todoList/update`,
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
            <label className="todo-label" htmlFor={id}>
              New name for {name}
            </label>
            <input
            id={id}
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
              <span className="visually-hidden">renaming {name}</span>
            </button>
            <button type="submit" className="btn btn__primary todo-edit">
              Save
              <span className="visually-hidden">new name for {name}</span>
            </button>
          </div>
        </form>
      );
      const viewTemplate = (
        <div className="stack-small">
          <div className="c-cb">
              <input
                id={id}
                type="checkbox"
                defaultChecked={completed}
                onChange={() => toggleTaskComplited(id)}
              />
              <label className="todo-label" htmlFor={id}>
                <strong>Task: </strong>{name}
                <strong> State: </strong>{state}
              </label>
            </div>
            <div className="btn-group">
              <button
              type="button"
              className="btn"
              onClick={() => setEditing(true)}
              >
                Edit <span className="visually-hidden">{name}</span>
              </button>
              <button
                type="button"
                className="btn btn__danger"
                onClick={() => deleteTask(id, tasks, setTasks)}
              >
                Delete <span className="visually-hidden">{name}</span>
              </button>
              <NativeSelect id="select" onChange={ (e) => 
                { 
                  stateChangeHandler(id, e);
                }}>
                {states.map(taskState => (
                  <option value={taskState}>{taskState}</option>
                ))}
              </NativeSelect>
            </div>
        </div>
      );

      useEffect(() => {
        if (!wasEditing && isEditing) {
            editFieldRef.current.focus();
          }
        }, [wasEditing, isEditing]);

    return <li className='todo'>{isEditing ? editingTemplate : viewTemplate}</li>;
}