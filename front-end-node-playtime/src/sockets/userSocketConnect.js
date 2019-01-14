import { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { baseURL } from '../global';

const socket = socketIOClient(baseURL, {
  rejectUnauthorized: false
});

export const userSocketConnect = setUsers =>
  useEffect(async () => {
    socket.emit('usersSocket', users => {
      console.log('getting Initial Users!', users);
      setUsers(users);
    });
    socket.on('usersSocket', users => {
      console.log('got the users!', users);
      setUsers(users);
    });
    socket.on('connect_error', err => {
      console.error('API Error:', err);
      socket.disconnect();
    });

    return () => socket.disconnect();
  }, []);

export const reqUser = async user => {
  const res = await socket.emit('reqUser', user);
  console.log('user from the other side', res);
  return res;
};

export const getUser = setUser => {
  useEffect(async () => {
    socket.on('getUser', user => {
      console.log('heard getUser on Client!', user);
      setUser(user);
    });
  }, []);
};

export const postNewUser = user => {
  socket.emit('postNewUser', user);
};

export default userSocketConnect;
