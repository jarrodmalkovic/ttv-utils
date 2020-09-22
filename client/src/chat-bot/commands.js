import { getBot } from '../actions/bot';

export const lineSpam = function (target, lines, timeout) {
  const linesArray = lines.split(',');
  const bot = getBot();

  let line = 1;

  for (let i = 0; i < linesArray.length; i++) {
    setTimeout(function () {
      bot.say(target, linesArray[i]);
    }, timeout * line);
    line++;
  }
};

export const pyramid = function (target, height, timeout, emote) {
  const bot = getBot();
  let line = 1;
  for (let i = 1; i <= height - 1; i++) {
    setTimeout(function () {
      bot.say(target, `${emote} `.repeat(i));
    }, timeout * line);
    line++;
  }

  for (let i = height; i >= 0; i--) {
    setTimeout(function () {
      bot.say(target, `${emote} `.repeat(i));
    }, timeout * line);
    line++;
  }

  console.log(`* Printed a ${emote} pyramid of height ${height} in ${target}`);
};
