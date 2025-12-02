import { Auth0Provider, User, type AppState } from "@auth0/auth0-react";

interface AuthProviderWithNavigateProps {
  children: React.ReactNode;
}

const Auth0ProviderWithNavigate = ({
  children,
}: AuthProviderWithNavigateProps) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URI;

  if (!domain || !clientId || !redirectUri) {
    throw new Error("Auth0 environment variables are not set properly.");
  }

  const onRedirectCallback = (appState?: AppState, user?: User) => {
    console.log("USER", user)
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
