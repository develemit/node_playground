const knex = require('../db/knex');

const connectedUsers = async (socket, io, count) => {
  try {
    console.log('heard connectedUsers', count);
    io.emit('connectedUsers', count);
  } catch (error) {
    console.error(`connectedUsers Error: ${error}`);
  }
};

module.exports = connectedUsers;
