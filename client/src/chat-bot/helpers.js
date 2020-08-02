import { getBot } from '../actions/bot';

let messageCount = 0;
let color = 0;

export const getRandomHex = () => {
  const chars = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    '',
  ];
  let hex = '';

  for (let i = 0; i < 6; i++) {
    const index = Math.floor(chars.length * Math.random());
    hex += chars[index];
  }

  return hex;
};

export const increaseMsgCount = function (colors) {
  color = messageCount % colors.length;
  messageCount++;

  console.log(
    `* Message count increased by 1. You have sent ${messageCount} messages since bot started.`
  );
};

export const changeNameColor = function (channelName, hex, colors) {
  const bot = getBot();

  if (hex) {
    bot.say(channelName, '/color ' + getRandomHex());
  } else {
    bot.say(channelName, '/color ' + colors[color]);
  }
};

export const saidByMe = function (context) {
  return context['display-name'] == 'dab_or_get_banned';
};
