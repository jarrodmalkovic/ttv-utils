import {
  LOGIN,
  BOT_OFFLINE,
  SAVE_RAINBOW,
  AUTHENTICATE,
} from '../actions/types';

const initialState = {
  username: null,
  isAuthenticated: false,
  running: false,
  password: null,
  channels: null,
  date: null,
  rainbow: false,
  random: false,
  def: false,
  colors: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      const [username, password] = payload;
      return {
        ...state,
        isAuthenticated: true,
        running: true,
        username,
        password,
        date: new Date(),
      };
    case BOT_OFFLINE:
      return {
        ...state,
        running: false,
      };
    case SAVE_RAINBOW:
      const { rainbow, def, colors, random, channels } = payload;
      return {
        ...state,
        rainbow,
        def,
        colors,
        random,
        channels,
      };
    case AUTHENTICATE:
      const [user, pass] = payload;
      return {
        ...state,
        username: user,
        password: pass,
        isAuthenticated: true,
      };
    default:
      return state;
  }
}
