import {
  LOGIN,
  BOT_ERROR,
  BOT_OFFLINE,
  SAVE_RAINBOW,
  AUTHENTICATE,
} from './types';
import React from 'react';
import Button from '@material-ui/core/Button';

import { onMessage, onConnected } from '../chat-bot/handlers';

import {
  enqueueSnackbar as enqueueSnackbarAction,
  closeSnackbar as closeSnackbarAction,
} from './notifications';

const tmi = require('tmi.js');
const axios = require('axios');

let client;
let prev;

export const startBot = (username, pass, channels, updated = false) => (
  dispatch
) => {
  const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
  const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));
  try {
    const split = channels ? channels.split(',') : [];

    const opts = {
      identity: {
        username: username,
        password: `oauth:${pass}`,
      },
      channels: split,
    };

    client = new tmi.client(opts);

    client.on('message', onMessage);
    client.on('connected', onConnected);

    client.connect();

    dispatch({
      type: LOGIN,
      payload: [username, pass, channels],
    });

    enqueueSnackbar({
      message: `Bot ${updated ? 'updated' : 'started'}`,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'success',
        action: (key) => (
          <Button onClick={() => closeSnackbar(key)}>dismiss me</Button>
        ),
      },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: BOT_ERROR,
    });

    enqueueSnackbar({
      message: 'Bot failed to start',
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error',
      },
    });
  }
};

export const stopBot = () => async (dispatch) => {
  const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
  const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));
  try {
    if (client) {
      client.disconnect();
      client = null;
      prev = null;
      dispatch({
        type: BOT_OFFLINE,
      });
      enqueueSnackbar({
        message: 'Bot stopped',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'info',
          action: (key) => (
            <Button onClick={() => closeSnackbar(key)}>dismiss me</Button>
          ),
        },
      });
    }
  } catch (err) {
    dispatch({
      type: BOT_ERROR,
    });
    enqueueSnackbar({
      message: 'Bot failed to stop',
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error',
      },
    });
  }
};

export const getBot = () => {
  return client;
};

export const pollBot = () => (dispatch) => {
  const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
  const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));
  if (prev && client.reason !== '') {
    dispatch({
      type: BOT_OFFLINE,
    });

    enqueueSnackbar({
      message: `Bot Disconnected: ${client.reason}`,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error',
        action: (key) => (
          <Button onClick={() => closeSnackbar(key)}>dismiss me</Button>
        ),
      },
    });

    prev = null;
    client = null;
  } else if (prev) {
    prev = client;
  } else if (client) {
    prev = client;
  }
};

export const saveSettings = (rainbow, random, def, colors, channels) => (
  dispatch
) => {
  const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
  const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

  dispatch({
    type: SAVE_RAINBOW,
    payload: {
      rainbow,
      colors,
      random,
      def,
      channels,
    },
  });

  enqueueSnackbar({
    message: `Settings saved`,
    options: {
      key: new Date().getTime() + Math.random(),
      variant: 'success',
      action: (key) => (
        <Button onClick={() => closeSnackbar(key)}>dismiss me</Button>
      ),
    },
  });
};

export const authenticate = (accessToken) => async (dispatch) => {
  const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
  const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

  try {
    let config = {
      headers: {
        'client-id': '9tur2hiygu3h8bczyds8l1dm29hzbv',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await axios.get('https://api.twitch.tv/helix/users', config);
    const user = res.data.data[0];
    console.log(user);

    dispatch({
      type: AUTHENTICATE,
      payload: [user.login, accessToken],
    });

    enqueueSnackbar({
      message: `Logged in`,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'success',
        action: (key) => (
          <Button onClick={() => closeSnackbar(key)}>dismiss me</Button>
        ),
      },
    });
  } catch (err) {
    enqueueSnackbar({
      message: `Authentication Error`,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error',
        action: (key) => (
          <Button onClick={() => closeSnackbar(key)}>dismiss me</Button>
        ),
      },
    });
  }
};
