import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import { User } from './components/User';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={routeProps => (
              <Home {...routeProps} users={users} setUsers={setUsers} />
            )}
          />
          <Route exactpath="/user" component={User} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
