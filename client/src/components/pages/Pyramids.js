import React, { useState, Fragment } from 'react';

import { Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import DemoButton from '../layout/DemoButton';

import { makeStyles } from '@material-ui/core/styles';

import StartButton from '../layout/StartButton';

import { Helmet } from 'react-helmet';

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

const Pyramids = ({ running }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    channel: '',
    height: '',
    emote: '',
  });

  const [timeout, setTimeout] = React.useState(1500);

  const { channel, height, emote } = formData;

  const handleSliderChange = (event, newValue) => {
    setTimeout(newValue);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    commands.pyramid('#' + channel, height, timeout, emote);
  };

  return (
    <div>
      <Helmet>
        <title>Pyramids</title>
      </Helmet>
      <Typography variant='h4'>Create Simple Chat Pyramids</Typography>
      <DemoButton type='Pyramids' />
      <form>
        <div className={classes.formgroup}>
          <Typography variant='h6'>Height of the pyramid</Typography>
          <TextField
            id='outlined-basic'
            label='e.g. 5'
            className={classes.input}
            name='height'
            value={height}
            onChange={onChange}
            variant='outlined'
          />
        </div>
        <div className={classes.formgroup}>
          <Typography variant='h6'>Channel to create the pyramid in</Typography>
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
          <Typography variant='h6'>
            Emote you want the pyramid to be made of
          </Typography>
          <TextField
            className={classes.input}
            id='outlined-basic'
            label='e.g TriHard'
            name='emote'
            value={emote}
            onChange={onChange}
            variant='outlined'
          />
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
          running={running}
          onSubmit={onSubmit}
          text={'Create Pyramids'}
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  running: state.bot.running,
});

export default connect(mapStateToProps)(Pyramids);
