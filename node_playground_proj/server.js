const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const cors = require('cors');
const logger = require('morgan');
const knex = require('./db/knex');
const http = require('http');
const socketIo = require('socket.io');
const usersSocket = require('./sockets/userSocket');
const postNewUser = require('./sockets/postNewUser');
const getUser = require('./sockets/getUser');
const editUser = require('./sockets/editUser');
const deleteUser = require('./sockets/deleteUser');

const index = require('./routes/indexRoutes');
const todos = require('./routes/todosRoutes');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/todos', todos);

const server = http.createServer(app);
const io = socketIo(server);

// const usersSocket = async socket => {
//   try {
//     const users = await knex('users').select();
//     socket.emit('usersSocket', users);
//   } catch (error) {
//     console.error(`Error: ${error}`);
//   }
// };

io.on('connection', socket => {
  console.log('New Client Connected!');
  let interval;
  socket.on('usersSocket', () => {
    usersSocket(socket, io);
  });

  // ** Things to Listen for ** //
  getUser(socket, io);
  postNewUser(socket, io);
  editUser(socket, io);
  deleteUser(socket, io);

  socket.on('disconnect', () => {
    console.log('client disconnected!');
    if (interval) clearInterval(interval);
  });
});

io.on('connect_error', err => {
  console.log('connection Error! closing socket', err);
  io.disconnect();
});

server.listen(port, function() {
  console.log('listening on port: ', port);
});
