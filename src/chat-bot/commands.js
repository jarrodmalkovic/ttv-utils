import { client } from '../actions/bot';

export const lineSpam = function (target, lines, timeout) {
  const linesArray = lines.split(',');
  let line = 1;

  for (let i = 0; i < linesArray.length; i++) {
    setTimeout(function () {
      client.say(target, linesArray[i]);
    }, timeout * line);
    line++;
  }
};

export const pyramid = function (target, height, timeout, emote) {
  let line = 1;
  for (let i = 1; i <= height - 1; i++) {
    setTimeout(function () {
      client.say(target, `${emote} `.repeat(i));
    }, timeout * line);
    line++;
  }

  for (let i = height; i >= 0; i--) {
    setTimeout(function () {
      client.say(target, `${emote} `.repeat(i));
    }, timeout * line);
    line++;
  }

  console.log(`* Printed a ${emote} pyramid of height ${height} in ${target}`);
};
