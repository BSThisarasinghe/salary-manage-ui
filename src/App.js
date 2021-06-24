import './App.css';
import React, { useEffect, useState } from 'react';
import { Switch, BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import AccessDenied from './screens/access-denied.screen';
import SubRouter from './sub-router';
import SignIn from './screens/signin.screen';
import SignUp from './screens/signup.screen';
import Auth0ProviderWithHistory from './helper/auth0-provider-with-history';
import { Spinner } from './components';

function App() {

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const history = useHistory();

  const setAuth = () => {
    // debugger;
    let expireTime = localStorage.getItem("expireTime");
    if (typeof expireTime !== undefined && expireTime !== null) {
      if (new Date(expireTime) < new Date()) {
        setLoading(false);
        setAuthenticated(false);
      } else {
        setLoading(false);
        setAuthenticated(true);
      }
    } else {
      setLoading(false);
      setAuthenticated(false);
    }
  }

  useEffect(() => {
    setAuth();
  }, [])

  return (
    <Router history={history}>
      <Switch>
        {loading && <Spinner />}
        <Route exact path="/signin" render={(props) => <SignIn {...props} />} />
        <Route exact path="/signup" render={(props) => <SignUp {...props} />} />
        <SubRouter authenticated={authenticated} />
      </Switch>
    </Router>
  );
}

export default App;
