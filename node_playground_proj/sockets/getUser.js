const knex = require('../db/knex');

const getUser = async socket => {
  console.log('Connection to single user!');
  try {
    socket.on('reqUser', async first_name => {
      const requestedUser = await knex('users')
        .where('first_name', first_name)
        .first();
      console.log(
        requestedUser ? 'New Found Added!' : 'not found!',
        requestedUser
      );
      socket.emit('getUser', requestedUser || {});
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports = getUser;
