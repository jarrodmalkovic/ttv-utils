import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import Pyramids from '../pages/Pyramids';
import RainbowText from '../pages/RainbowText';
import LineSpam from '../pages/LineSpam';
import FAQ from '../pages/FAQ';

const Routes = (props) => {
  return (
    <Switch>
      <Route exact path='/' component={FAQ} />
      <Route exact path='/rainbow' component={RainbowText} />
      <Route exact path='/pyramids' component={Pyramids} />
      <Route exact path='/linesayer' component={LineSpam} />
      <Route exact component={NotFound} />
    </Switch>
  );
};

export default Routes;
