const knex = require('../db/knex');

const usersSocket = async socket => {
  try {
    const users = await knex('users').select();
    socket.emit('usersSocket', users);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports = usersSocket;
