import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { reqUser, getUser } from '../sockets/userSocketConnect';

export const User = () => {
  const [{ first_name, last_name }, setUser] = useState({});
  const [input, setInput] = useState('');

  getUser(setUser);
  return (
    <div>
      <span>hello</span>
      <br />
      <input
        value={input}
        onChange={({ target: { value } }) => setInput(value)}
      />
      <br />
      <button onClick={() => reqUser(input)}>Request User!</button>

      {first_name && (
        <div>
          <span>Here is your Result!</span>
          <br />
          <span>{`${first_name} ${last_name}`}</span>
        </div>
      )}
      <br />
      <Link to="/">
        <span>Go Back Home</span>
      </Link>
    </div>
  );
};
