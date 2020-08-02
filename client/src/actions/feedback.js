import { FEEDBACK_ERROR, FEEDBACK_SUCCESSFUL } from './types';

import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';

import {
  enqueueSnackbar as enqueueSnackbarAction,
  closeSnackbar as closeSnackbarAction,
} from './notifications';

import axios from 'axios';

export const giveFeedback = (feedback) => async (dispatch) => {
  console.log('yooo');
  const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
  const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

  const res = await axios.post(`http://127.0.0.1:4000/api/feedback`, feedback);
  console.log(res);
  try {
    enqueueSnackbar({
      message: `${res.data}`,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'success',
        action: (key) => (
          <Button onClick={() => closeSnackbar(key)}>dismiss me</Button>
        ),
      },
    });

    return res.status;
  } catch (err) {
    enqueueSnackbar({
      message: `${err}`,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'success',
        action: (key) => (
          <Button onClick={() => closeSnackbar(key)}>dismiss me</Button>
        ),
      },
    });
  }
};
