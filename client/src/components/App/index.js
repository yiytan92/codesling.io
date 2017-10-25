import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from '../App/LandingPage';
import CodeEditor from '../CodeEditor';

import './App.css';

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route path='/:socketID' component={CodeEditor} />
        <Route path='/' component={LandingPage} />
      </Switch>
    </div>
  );
};

export default App;
