import './App.css';
import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import AccessDenied from './screens/access-denied.screen';
import SubRouter from './sub-router';
import SignIn from './screens/signin.screen';
// import { Spinner } from './components';

function App() {

  const onLogout = () => {
    // this.state.keycloak.logout();
  }

  return (
    <div>
      <Router>
        <Switch>
          {/* {!this.state.keycloak && <Spinner />}
          {!this.state.authenticated && <AccessDenied onLogout={onLogout} />} */}
          <Route exact path="/signin" render={(props) => <SignIn {...props} />} />
          {<SubRouter />}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
