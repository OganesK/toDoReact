/* eslint-disable react/destructuring-assignment */
import React,{ useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// eslint-disable-next-line import/no-unresolved
import LogoutIcon from '@material-ui/icons/Logout';
import DeleteIcon from '@material-ui/icons/Delete'
import { useCookies } from "react-cookie";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    marginRight: -drawerWidth - drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft(props) {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(["authorization"]);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [newGroup, setNewGroup] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [curGroup, setCurGroup] = useState(props.curGroup)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleNewGroupInput = (e) => {
    setNewGroup(e.target.value);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const groupChooseHandler = (groupName) => {
    props.setGroup(groupName);
    setCurGroup(groupName);
  }

  const deleteHandler = async (name) => {
    const newGroups = props.groups.filter(group => group !== name)
    await fetch('http://localhost:3001/user/groups/delete',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newGroups)
  })
  props.setGroups(newGroups)
  }

  const logOutHandler = () => {
    removeCookie('authorization');
    props.setLogging(true);
  }

  const newGroupSubmit = async () => {
    const newGroups = [...props.groups, newGroup]
    await fetch('http://localhost:3001/user/groups/add',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newGroups)
  })
  props.setGroups(newGroups)
  setNewGroup('')
}


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            To-Do App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {props.groups.map((text) => (
            <ListItem button key={text} onClick={() => groupChooseHandler(text)}>
              <ListItemText primary={text} />
              <IconButton aria-label="delete" onClick={() => deleteHandler(text)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
          <ListItem>
          <TextField id="standard-basic" label="Text new group name" value={newGroup} onChange={handleNewGroupInput}/>
          </ListItem>
          <ListItem>
          <Button variant="contained" color="primary" onClick={newGroupSubmit}>
            Add new group
          </Button>
          </ListItem>
        </List>
        <IconButton aria-label="delete" onClick={logOutHandler}>
            <LogoutIcon />
        </IconButton>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.mainContent}
      </main>
    </div>
  );
}