import NativeSelect from '@material-ui/core/NativeSelect';
import React, { useState } from 'react';

const TaskGroupSelector = props => {

    const [newGroup, setNewGroup] = useState('');

    const onChangeSelect = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        props.setGroup(e.target.value)
    }

    const newGroupNameHandler = (e) => {
        setNewGroup(e.target.value);
    }

    const newGroupSubmit = async (e) => {

        if(e.key === 'Enter'){
            console.log('Im here');
            const newGroups = [...props.groups, newGroup];
            props.setGroup(newGroups);
            await fetch('http://localhost:3001/user/groups/add',
            {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGroups)
            });
            setNewGroup('');
        }
        
    }

    return (
        <div id='selectdiv'>
        
        <NativeSelect id="select" onChange={onChangeSelect}>
            {props.groups.map(group => (
                 <option value={group}>{group}</option>
            ))}
        </NativeSelect>
        <input value={newGroup} onChange={newGroupNameHandler} onKeyDown={newGroupSubmit}></input>
        </div>
    
        
    )
} 

export default TaskGroupSelector;