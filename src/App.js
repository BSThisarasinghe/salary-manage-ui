import './App.css';
import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import AccessDenied from './screens/access-denied.screen';
import SubRouter from './sub-router';
import SignIn from './screens/signin.screen';
import Auth0ProviderWithHistory from './helper/auth0-provider-with-history';
import { Spinner } from './components';

function App() {

  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const onLogout = () => {
    // this.state.keycloak.logout();
  }

  return (
    <Router>
      <Auth0ProviderWithHistory>
        <Switch>
          {/* {isLoading && <div className="spinner_container">
            <Spinner />
          </div>}
          {!isAuthenticated && <AccessDenied onLogout={onLogout} />} */}
          <Route exact path="/signin" render={(props) => <SignIn {...props} />} />
          {<SubRouter isLoading={isLoading} isAuthenticated={isAuthenticated} />}
        </Switch>
      </Auth0ProviderWithHistory>
    </Router>
  );
}

export default App;
