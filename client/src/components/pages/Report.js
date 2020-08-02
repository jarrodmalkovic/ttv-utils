import React, { useState } from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Helmet } from 'react-helmet';

import { giveFeedback } from '../../actions/feedback';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
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

const Report = ({ giveFeedback }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    username: '',
    suggestion: '',
    submitting: false,
  });

  const { username, suggestion, submitting } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setFormData({ submitting: true });

    const feedback = { username, type: 'Report', text: suggestion };
    const status = await giveFeedback(feedback);

    if (status === 200) {
      setFormData({
        username: '',
        suggestion: '',
      });
    }

    setFormData({ submitting: false });
  };

  return (
    <div>
      <Helmet>
        <title>Report</title>
      </Helmet>
      <Typography variant='h4'>Report a Problem</Typography>
      <form onSubmit={onSubmit}>
        <div className={classes.formgroup}>
          <Typography variant='h6'>Your Twitch Name</Typography>
          <TextField
            id='outlined-basic'
            label='Optional'
            className={classes.input}
            name='username'
            value={username}
            onChange={onChange}
            variant='outlined'
          />
        </div>
        <div className={classes.formgroup}>
          <Typography variant='h6'>Your Report</Typography>
          <TextField
            className={classes.input}
            id='outlined-basic'
            label='e.g. There is a bug that happens when I...'
            name='suggestion'
            value={suggestion}
            rows={12}
            multiline
            onChange={onChange}
            variant='outlined'
            required
          />
        </div>
        <Button type='submit' variant='contained'>
          {submitting ? ' Submitting...' : 'Report problem'}
        </Button>
      </form>
    </div>
  );
};

export default connect(null, { giveFeedback })(Report);
