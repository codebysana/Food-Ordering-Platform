import { User, type AppState } from "@auth0/auth0-react";
import type React from "react";

type Props = {
  children: React.ReactNode;
};

const Auth0Provider = ({ children }: Props) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectURL = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  if (!domain || !clientId || redirectURL) {
    throw new Error("unable to inistialize auth");
  }

  const onRedirectCallback = (appState?: AppState, user?: User) => {
    console.log("USER", user);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_url: redirectURL }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0Provider;
