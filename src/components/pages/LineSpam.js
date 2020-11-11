import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import DemoButton from '../layout/DemoButton';

import StartButton from '../layout/StartButton';

import { connect } from 'react-redux';

const commands = require('../../chat-bot/commands');

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
  warning: {
    fontWeight: 'bold',
  },
}));

const LineSpam = ({ running }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    channel: '',
    lines: '',
  });

  const [timeout, setTimeout] = React.useState(1500);

  const { channel, lines } = formData;

  const handleSliderChange = (event, newValue) => {
    setTimeout(newValue);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    commands.lineSpam('#' + channel, lines, timeout);
  };

  return (
    <div>
      <Helmet>
        <title>Line Spammer</title>
      </Helmet>
      <Typography variant='h4'>Create Line Spam</Typography>
      <DemoButton type='Auto Say' />
      <form>
        <div className={classes.formgroup}>
          <Typography variant='h6'>Channel to spam lines in</Typography>
          <TextField
            className={classes.input}
            id='outlined-basic'
            label='e.g. xQcOW'
            name='channel'
            value={channel}
            onChange={onChange}
            variant='outlined'
          />
        </div>
        <div className={classes.formgroup}>
          <Typography variant='h6'>Lines you want to spam</Typography>
          <TextField
            className={classes.input}
            id='outlined-basic'
            label='e.g TriHard,TriHard,TriHard'
            name='lines'
            multiline
            rows={12}
            value={lines}
            onChange={onChange}
            variant='outlined'
          />
          <Typography paragraph>Enter as Comma Seperated Values.</Typography>
        </div>
        <div className={classes.formgroup}>
          <Typography variant='h6'>
            How long between each line of the pyramid in milliseconds
          </Typography>
          <Slider
            value={timeout}
            min={0}
            max={5000}
            className={classes.input}
            onChange={handleSliderChange}
            valueLabelDisplay='auto'
            aria-labelledby='input-slider'
          />
        </div>
        <Typography
          className={timeout * 1 < 1500 ? classes.warning : ''}
          paragraph
        >
          Important: Too low of a timeout can result in a temporary shadow ban
          from twitch. The recommended time between lines is 1500 ms if you are
          not VIP in the channel you are trying to spam in.
        </Typography>
        <StartButton
          onSubmit={onSubmit}
          running={running}
          text={'Create Line Spam'}
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  running: state.bot.running,
});

export default connect(mapStateToProps)(LineSpam);
