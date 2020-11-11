import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { Helmet } from 'react-helmet';

import { setRainbowChat } from '../../chat-bot/handlers';
import { saveSettings } from '../../actions/bot';
import { startBot } from '../../actions/bot';

import DemoButton from '../layout/DemoButton';
import SaveButton from '../layout/SaveButton';
import ViewColorsButton from '../buttons/ViewColorsButton';
import { connect } from 'react-redux';

import '../../styles/App.css';

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

const RainbowText = ({
  running,
  randomState,
  defaultState,
  rainbowState,
  colorsState,
  saveSettings,
  startBot,
  channelname,
  channelState,
  oauth,
}) => {
  const classes = useStyles();

  const [colors, setColors] = useState(colorsState);

  const [rainbow, setRainbow] = useState(rainbowState);

  const [random, setRandom] = useState(randomState);

  const [def, setDefault] = useState(defaultState);

  const [channels, setChannels] = useState(channelState);

  const onSubmit = (e) => {
    e.preventDefault();
    setRainbowChat(rainbow, random, def, colors);
    saveSettings(rainbow, random, def, colors, channels);
    startBot(channelname, oauth, channels, true);
  };

  const onRainbowChange = (e) => {
    setRainbow(!rainbow);
  };

  const onChange = (e) => {
    setColors(e.target.value);
  };

  const onRandom = (e) => {
    setRandom(!random);
  };

  const onDefault = (e) => {
    setDefault(!def);
  };

  const onChannels = (e) => {
    setChannels(e.target.value);
  };

  const diff = () => {
    return (
      rainbow !== rainbowState ||
      def !== defaultState ||
      colors !== colorsState ||
      random !== randomState ||
      channels !== channelState
    );
  };

  return (
    <div>
      <Helmet>
        <title>Rainbow Text</title>
      </Helmet>
      <Typography variant='h4'>
        Make your text <span className='rainbow'>rainbow!</span>
      </Typography>
      <DemoButton type='Rainbow' />
      <form>
        <div className={classes.formgroup}>
          <Typography variant='h6'>Enable Rainbow Text</Typography>
          <Switch checked={rainbow} onChange={onRainbowChange} />
        </div>
        <div className={classes.formgroup}>
          <Typography variant='h6'>
            Use random hex color codes (Twitch Turbo Users Only)
          </Typography>
          <Switch
            disabled={!rainbow || def}
            checked={random}
            onChange={onRandom}
          />
        </div>
        <div className={classes.formgroup}>
          <Typography variant='h6'>
            Use default colors set by TTVUtils (Red, OrangeRed, Goldenrod,
            Green, Blue, BlueViolet)
          </Typography>
          <Switch
            disabled={!rainbow || random}
            checked={def}
            onChange={onDefault}
          />
        </div>
        <div className={classes.formgroup}>
          <Typography variant='h6'>Set Custom Colors</Typography>
          <TextField
            id='outlined-basic'
            label='e.g. Red,Blue,Green'
            onChange={onChange}
            value={colors}
            disabled={!rainbow || def || random}
            className={classes.input}
            name='height'
            variant='outlined'
          />
          <Typography paragraph>
            Enter as Comma Seperated Values. Click <ViewColorsButton /> to see a
            list of available colors
          </Typography>
        </div>
        <div className={classes.formgroup}>
          <Typography variant='h6'>
            Set channels you want Rainbowify to work in
          </Typography>
          <TextField
            id='outlined-basic'
            label='e.g. xQcOW,Jinnytty,forsen,NymN'
            onChange={onChannels}
            value={channels}
            disabled={!rainbow}
            className={classes.input}
            name='height'
            variant='outlined'
          />
          <Typography paragraph>Enter as Comma Seperated Values.</Typography>
        </div>
        <SaveButton onSubmit={onSubmit} running={running} changes={diff()} />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  running: state.bot.running,
  randomState: state.bot.random,
  defaultState: state.bot.def,
  colorsState: state.bot.colors,
  rainbowState: state.bot.rainbow,
  channelState: state.bot.channels,
  channelname: state.bot.username,
  oauth: state.bot.password,
});

export default connect(mapStateToProps, { saveSettings, startBot })(
  RainbowText
);
