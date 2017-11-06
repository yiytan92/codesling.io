import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from '../LandingPage';
import Sling from '../Sling';

import './App.css';

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route path='/:socketID' component={Sling} />
        <Route path='/' component={LandingPage} />
      </Switch>
    </div>
  );
};

export default App;
