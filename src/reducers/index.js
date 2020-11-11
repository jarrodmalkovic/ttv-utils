import { combineReducers } from 'redux';
import notifications from './notifications';
import bot from './bot';

export default combineReducers({
  notifications,
  bot,
});
