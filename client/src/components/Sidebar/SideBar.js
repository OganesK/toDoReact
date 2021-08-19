/* eslint-disable react/jsx-boolean-value */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import useState hook to create menu collapse state
import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import {FiLogOut} from "react-icons/fi";
import "./SideBar.css";
// import IconButton from '@material-ui/core/IconButton';
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import Button from '@material-ui/core/Button';



const Header = ({groups, setGroup, setGroups, curGroup}) => {

    const [newGroup, setNewGroup] = useState('');

    const groupClickHandler = (e, clickedGroup)=> {
        e.preventDefault();
        setGroup(clickedGroup)
    }

    const newGroupNameHandler = (e) => {
        setNewGroup(e.target.value);
    }

    const newGroupSubmit = async (e) => {

        if(e.key === 'Enter'){
            setNewGroup('');
            const newGroups = [...groups, newGroup];
            setGroups(newGroups);
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
        }
        
    }

    const deleteGroupButton = async () => {
        const newGroups = groups.filter(group => group !== curGroup)
        setGroups(newGroups);
        await fetch('http://localhost:3001/user/groups/delete',
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

    return (
    <>
      <div id="header">
          
        <ProSidebar collapsed={false}>
          <SidebarHeader>
          <div className="logotext">
              <p>Task-Groups</p>
            </div>
            <input id='newGroupInput'
            value={newGroup}
            onChange={newGroupNameHandler}
            onKeyDown={newGroupSubmit} 
            />
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
                {groups.map(group => (
                    <MenuItem title={group} onClick={(e) => groupClickHandler(e,group)} icon={<FormatListBulletedIcon />}>{group}</MenuItem>
                ))}
            </Menu>
          </SidebarContent>
        <button className="deleteButton" type='button' onClick={deleteGroupButton}>
            Delete Group
        </button>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  )}
;

export default Header;