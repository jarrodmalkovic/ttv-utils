import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import { Router, Route } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { createBrowserHistory } from 'history';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Login from '../auth/Login';
import BotStatus from './BotStatus';
import DrawerList from './DrawerList';

import Routes from '../routing/Routes';
import { Tooltip } from '@material-ui/core';

const drawerWidth = 240;
const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  logo: { paddingLeft: theme.spacing(2) },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  contentRoot: {
    width: '75%',
    margin: '0 auto',
  },
  smallPadding: {
    marginTop: '4px',
    marginBottom: '4.5px',
  },
}));

export default function SideMenu(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Router history={history}>
      <div className={classes.logo}>
        <Tooltip title='Yeah but TTVUtils is like a 3rd party thing..'>
          <h2 className={classes.smallPadding}>TTVUtils v0.1</h2>
        </Tooltip>
        <p className={classes.smallPadding}>Chat Utilities for TwitchTV</p>
      </div>
      <DrawerList />
    </Router>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' style={{ flex: 1 }}></Typography>
          <Login className={classes.button} />
          <BotStatus className={classes.button} />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router history={history}>
          <div className={classes.contentRoot}>
            <Route component={Routes} />
          </div>
        </Router>
      </main>
    </div>
  );
}
