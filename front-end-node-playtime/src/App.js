import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, User } from './components';
import './App.css';

// ** yey! ** //

const App = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  return (
    <BrowserRouter>
      <div className="App">
        <p style={{ color: 'white', position: 'absolute' }}>
          There are {count} users on this site!
        </p>
        <Switch>
          <Route
            exact
            path="/"
            render={routeProps => (
              <Home
                {...routeProps}
                users={users}
                setUsers={setUsers}
                setCount={setCount}
              />
            )}
          />
          <Route exactpath="/user" component={User} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
