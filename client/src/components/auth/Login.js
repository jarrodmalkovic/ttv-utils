import React, { useState, useEffect, Fragment } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Link } from '@material-ui/core';

import { startBot, stopBot, authenticate } from '../../actions/bot';
import { connect } from 'react-redux';

const axios = require('axios');

const bot = require('../../chat-bot/bot');

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  formgroup: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  text: {
    textalign: 'center',
    width: '100%',
  },
  input: {
    width: '100%',
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Login = ({
  startBot,
  stopBot,
  running,
  location,
  authenticate,
  isAuthenticated,
  username,
  oauth,
}) => {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    channelname: '',
    oauth: '',
    channels: '',
  });

  useEffect(() => {
    if (document.location.hash) {
      console.log(document.location.hash);
      const accessToken = document.location.hash.split('&')[0].split('=')[1];
      authenticate(accessToken);
      document.location.hash = '';
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleStop = (e) => {
    stopBot();
  };

  const handleStart = (e) => {
    startBot(username, oauth);
  };

  const classes = useStyles();

  return (
    <div>
      {!isAuthenticated && (
        <Button
          color='inherit'
          href='https://id.twitch.tv/oauth2/authorize?client_id=9tur2hiygu3h8bczyds8l1dm29hzbv&redirect_uri=http://localhost:3000&response_type=token&scope=chat:edit
        chat:read channel:moderate whispers:edit
        whispers:read&force_verify=true'
        >
          Log in with Twitch
        </Button>
      )}
      {isAuthenticated && (
        <Fragment>
          {running ? (
            <Button onClick={handleStop} color='inherit'>
              Stop Bot
            </Button>
          ) : (
            <Button onClick={handleStart} color='inherit'>
              Start Bot
            </Button>
          )}
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.bot.isAuthenticated,
  running: state.bot.running,
  oauth: state.bot.password,
  username: state.bot.username,
});

export default connect(mapStateToProps, { startBot, stopBot, authenticate })(
  Login
);
