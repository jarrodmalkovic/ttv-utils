import React, { useState, useEffect, Fragment } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import { startBot, pollBot } from '../../actions/bot';
import { connect } from 'react-redux';

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

const getChannelString = (channels) => {
  const channelArr = channels ? channels.split(',') : [];
  let str = '';
  for (let i = 0; i < channelArr.length; i++) {
    if (i === channelArr.length - 1) {
      str += ' and ' + channelArr[i] + "'s channel.";
    } else if (i === 0) {
      str += ' ' + channelArr[i];
    } else {
      str += ', ' + channelArr[i];
    }
  }
  return str;
};

const BotStatus = ({ channels, date, pollBot, running, username }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      pollBot();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const classes = useStyles();

  return (
    <div>
      <Button
        className={classes.button}
        color='inherit'
        onClick={handleClickOpen}
      >
        BOT STATUS: {running ? 'ONLINE' : 'OFFLINE'}
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          Status
        </DialogTitle>
        <DialogContent dividers>
          {running ? (
            <Fragment>
              <Typography variant='h6'>Logged in as</Typography>
              <Typography paragraph>
                Your bot is current logged in as {username}
              </Typography>
              <Typography variant='h6'>Active In</Typography>
              <Typography paragraph>
                {channels
                  ? `Your bot is current active in
                ${getChannelString(channels)}`
                  : 'Your bot is currently not active in any channels'}
              </Typography>
              <Typography variant='h6'>Online Since</Typography>
              <Typography paragraph>
                Your bot has been online for since {15}
              </Typography>
            </Fragment>
          ) : (
            <Typography paragraph>
              Your utility bot is currently not active. Click the config button
              on the top right to get started.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='primary'>
            GOT IT
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  running: state.bot.running,
  channels: state.bot.channels,
  date: state.bot.date,
  username: state.bot.username,
});

export default connect(mapStateToProps, { startBot, pollBot })(BotStatus);
