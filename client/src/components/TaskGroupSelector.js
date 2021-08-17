/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/self-closing-comp */
import NativeSelect from '@material-ui/core/NativeSelect';
import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const TaskGroupSelector = props => {

    const [newGroup, setNewGroup] = useState('');

    const onChangeSelect = (e) => {
        e.preventDefault();
        props.setGroup(e.target.value)
    }

    const handleSelect = (e) => {
        e.target.select();
      };

    // eslint-disable-next-line no-unused-vars
    const deleteGroupButton = async e => {
        const newGroups = props.groups.filter(group => group !== props.curGroup)
        props.setGroups(newGroups);
        await fetch('/user/groups/delete',
            {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGroups)
            });
    }

    const newGroupNameHandler = (e) => {
        setNewGroup(e.target.value);
    }

    const newGroupSubmit = async (e) => {

        if(e.key === 'Enter'){
            setNewGroup('');
            const newGroups = [...props.groups, newGroup];
            props.setGroups(newGroups);
            await fetch('/user/groups/add',
            {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGroups)
            });
        }
        
    }

    return (
        <div id='selectdiv'>
            <IconButton aria-label="delete" onClick={deleteGroupButton}>
                <DeleteForeverIcon />
            </IconButton>
            <NativeSelect id="select" onChange={onChangeSelect}>
                {props.groups.map(group => (
                    <option key={group} value={group}>{group}</option>
                ))}
            </NativeSelect>
            <input onClick={handleSelect} value={newGroup} onChange={newGroupNameHandler} onKeyDown={newGroupSubmit}></input>
        </div>
    
        
    )
} 

export default TaskGroupSelector;