import { onMessage, onConnected } from './handlers';
const tmi = require('tmi.js');

let client;

export const createClient = (username, pass, channels) => {
  if (client) {
    client.disconnect();
    client = null;
  }

  client = new tmi.Client({
    connection: {
      secure: true
    }, identity: {
      username: username,
      password: pass,
    },
    channels: channels.split(','),
  });

  client.on('message', onMessage);
  client.on('connected', onConnected);
  client.connect();

  if (client.reason !== '') {
    stopClient();
    throw new Error(client.reason);
  }
};

export const stopClient = () => {
  if (client) {
    client.disconnect();
    client = null;
  }

  console.log('* client has been stopped');
};

export const getClient = () => {
  return client;
};