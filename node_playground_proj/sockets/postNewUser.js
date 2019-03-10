const knex = require('../db/knex');

const postNewUser = async (socket, io) => {
  try {
    socket.on('postNewUser', async user => {
      await knex('users').insert(user);
      console.log('New User Added!', user);
      const users = await knex('users').select();
      io.emit('usersSocket', users);
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports = postNewUser;
