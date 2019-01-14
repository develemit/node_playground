const knex = require('../db/knex');

const postNewUser = async socket => {
  try {
    socket.on('postNewUser', async user => {
      await knex('users').insert(user);
      console.log('New User Added!', user);
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports = postNewUser;
