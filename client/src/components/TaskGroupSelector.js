import NativeSelect from '@material-ui/core/NativeSelect';
import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const TaskGroupSelector = ({ setGroup, groups, setGroups, curGroup}) => {

    const [newGroup, setNewGroup] = useState('');

    const onChangeSelect = (e) => {
        e.preventDefault();
        setGroup(e.target.value)
    }

    const handleSelect = (e) => {
        e.target.select();
      };

    const deleteGroupButton = async () => {
        const newGroups = groups.filter(group => group !== curGroup)
        setGroups(newGroups);
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
            const newGroups = [...groups, newGroup];
            setGroups(newGroups);
            await fetch('http:localhost:3001/user/groups/add',
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
                {groups.map(group => (
                    <option key={group} value={group}>{group}</option>
                ))}
            </NativeSelect>
            <input
            onClick={handleSelect}
            value={newGroup}
            onChange={newGroupNameHandler}
            onKeyDown={newGroupSubmit} />
        </div>
    
        
    )
} 

export default TaskGroupSelector;