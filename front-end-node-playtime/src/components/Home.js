import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import userSocketConnect, { postNewUser } from '../sockets/userSocketConnect';

export const Home = ({ users, setUsers }) => {
  userSocketConnect(setUsers);
  const [tenetive, setTenetive] = useState('');
  const renderUsers = users.map(({ first_name }) => (
    <li key={first_name}>First Name: {first_name}</li>
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
