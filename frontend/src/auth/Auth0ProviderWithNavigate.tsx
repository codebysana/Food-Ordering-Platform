import { useCreateMyUser } from "@/api/MyUserApi";
import {
  Auth0Provider,
  useAuth0,
  User,
  type AppState,
} from "@auth0/auth0-react";
import type React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  // console.log("Auth0 config values:", { domain, clientId, redirectUri});

  if (!domain || !clientId || !redirectUri) {
    throw new Error("unable to inistialize auth");
  }

  const onRedirectCallback = async (appState?: AppState, user?: User) => {
    const token = await getAccessTokenSilently();
    console.log("token", token);
    navigate("/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
