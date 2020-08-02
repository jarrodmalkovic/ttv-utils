import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FeelsDankMan from '../../img/FeelsDankMan.jpg';

const useStyles = makeStyles({
  root: {
    width: '80%',
    margin: '0 auto',
    display: 'block',
  },
  img: {
    width: '100%',
    height: '650px',
  },
  text: {
    textAlign: 'center',
  },
});

function NotFound() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img className={classes.img} src={FeelsDankMan} alt='FeelsDankMan' />
      <h2 className={classes.text}>ERROR 404: Page Not Found</h2>
    </div>
  );
}

export default NotFound;
