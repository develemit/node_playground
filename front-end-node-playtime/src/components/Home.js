import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import userSocketConnect, {
  postNewUser,
  deleteUser,
  editUser
} from '../sockets/userSocketConnect';

export const Home = ({ users, setUsers }) => {
  userSocketConnect(setUsers);
  const [tenetive, setTenetive] = useState('');
  const [editValue, setEditValue] = useState('');

  const [edit, setEdit] = useState({ id: null });

  const renderUsers = users
    .sort(({ id: a }, { id: b }) => a - b)
    .map(({ first_name, id }) => (
      <li
        key={first_name}
        onClick={() => {
          setEdit({ id });
          setEditValue(first_name);
        }}
      >
        {edit.id === id ? (
          <input
            autoFocus
            value={editValue}
            onChange={({ target: { value } }) => setEditValue(value)}
            onBlur={() => {
              setEdit({ id: null });
              if (editValue !== first_name) editUser(id, editValue);
            }}
          />
        ) : (
          <span>{first_name}</span>
        )}{' '}
        <button onClick={() => deleteUser(id)}>X</button>
      </li>
    ));
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Emit</p>

        <span>Need to add a user?</span>
        <br />
        <input
          value={tenetive}
          onChange={({ target: { value } }) => setTenetive(value)}
        />
        <button
          onClick={() => {
            postNewUser({ first_name: tenetive, last_name: 'tenative' });
            setTenetive('');
          }}
          disabled={!tenetive}
        >
          Add a User!
        </button>
        <br />
        <label>The List Of Users!</label>
        <ul>{renderUsers}</ul>
        <Link to="/user">
          <span>To User!</span>
        </Link>
      </header>
    </div>
  );
};

export default Home;
