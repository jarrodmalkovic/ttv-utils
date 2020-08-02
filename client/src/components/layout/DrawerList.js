import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { NavLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const DrawerList = () => {
  return (
    <Fragment>
      <Divider />
      <List>
        <ListItem button component={NavLink} to='/' key='FAQ'>
          <ListItemText primary='FAQ' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          component={NavLink}
          activeStyle={{ backgroundColor: '#e4e4e4', color: 'black' }}
          to='/rainbow'
          key='Rainbow Text'
        >
          <ListItemText primary='Rainbowify' />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          activeStyle={{ backgroundColor: '#e4e4e4', color: 'black' }}
          to='/pyramids'
          key='Pyramids'
        >
          <ListItemText primary='Chat Pyramids' />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          activeStyle={{ backgroundColor: '#e4e4e4', color: 'black' }}
          to='/linesayer'
          key='Line Sayer'
        >
          <ListItemText primary='Auto Say Lines' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          component={NavLink}
          to='/suggestions'
          activeStyle={{ backgroundColor: '#e4e4e4', color: 'black' }}
          key='Suggest a Feature'
        >
          <ListItemText primary='Suggest a Feature' />
        </ListItem>
        <ListItem
          button
          activeStyle={{ backgroundColor: '#e4e4e4', color: 'black' }}
          component={NavLink}
          to='/report'
          key='Report a Problem'
        >
          <ListItemText primary='Report a Problem' />
        </ListItem>
      </List>
    </Fragment>
  );
};

export default DrawerList;
