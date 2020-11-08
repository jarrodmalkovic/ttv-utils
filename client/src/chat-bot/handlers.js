import { increaseMsgCount, changeNameColor, saidByMe } from './helpers';

let rainbow = false;
let textColors = [
  'Red',
  'OrangeRed',
  'Goldenrod',
  'Green',
  'Blue',
  'BlueViolet',
];
let textHex = false;

export const setRainbowChat = (value, hex, def, colors) => {
  rainbow = value;
  if (!hex && !def && value) {
    textColors = colors.split(',').map(color => color.trim());
  }

  if (def) {
    textColors = [
      'Red',
      'OrangeRed',
      'Goldenrod',
      'Green',
      'Blue',
      'BlueViolet',
    ];
  }

  textHex = hex;
};

export const onConnected = function (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
};

export const onMessage = function (target, context, msg, self) {
  if (saidByMe(context) && rainbow) {
    increaseMsgCount(textColors);
    changeNameColor(target, textHex, textColors);
  }
};

export const getRainbow = () => {
  return rainbow;
};
