import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID } from "../constants";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = REACT_APP_AUTH0_DOMAIN;
  const clientId = REACT_APP_AUTH0_CLIENT_ID;

  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || '/signin');
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={'/signin'}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;