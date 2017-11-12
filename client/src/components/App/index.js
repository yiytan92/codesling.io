import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from '../LandingPage';
import ProtectedSling from '../Sling';
import Login from '../Authentication/Login'
import Signup from '../Authentication/Signup'
import ErrorBoundary from '../Error/ErrorBoundary';

import './App.css';

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/:slingId' component={(props) => (
          <ErrorBoundary>
            <ProtectedSling {...props} />
          </ErrorBoundary>
        )} />
        <Route path='/' component={LandingPage} />
      </Switch>
    </div>
  );
};

export default App;
