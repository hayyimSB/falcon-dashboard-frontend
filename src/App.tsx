import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './awsconfig';
import useSettings from './hooks/useSettings';
import { useStores } from './hooks/useStores';
import routes from './routes';
import { createCustomTheme } from './theme';
import jwt_decode from 'jwt-decode';

Amplify.configure(awsconfig);

const App: FC = () => {
  const [authState, setAuthState] = useState<AuthState>();
  const [user, setUser] = useState<object | undefined>();
  const content = useRoutes(routes);
  const { settings } = useStores();
  const { uiSettings } = useSettings();
  const theme = createCustomTheme({
    responsiveFontSizes: uiSettings.responsiveFontSizes,
    roundedCorners: uiSettings.roundedCorners,
    theme: uiSettings.theme,
  });

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  useEffect(() => {
    if (authState === AuthState.SignedIn && user) {
      const cognito = 'CognitoIdentityServiceProvider';
      const userPoolId =
        Amplify.configure(awsconfig)['Auth'].userPoolWebClientId;
      const lastAuthUser = localStorage.getItem(
        cognito + '.' + userPoolId + '.LastAuthUser'
      );
      const accessToken = localStorage.getItem(
        cognito + '.' + userPoolId + '.' + lastAuthUser + '.accessToken'
      );
      settings.setAccessToken(accessToken);
      const expiredTime = jwt_decode(accessToken)['exp'] * 1000;
      settings.setTokenExpiredTime(expiredTime);
      updateAdminInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authState]);

  const updateAdminInfo = async () => {
    const currentAdminInfo = await getCurrentUser();
    const group =
      currentAdminInfo.signInUserSession.accessToken.payload[
        'cognito:groups'
      ][0];
    if (group !== 'Quant') {
      localStorage.clear();
      settings.setInit();
      window.location.reload();
    }
    settings.setAdminInfo({
      sub: currentAdminInfo.attributes.sub,
      email: currentAdminInfo.attributes.email,
      name: currentAdminInfo.attributes.name,
      phone: currentAdminInfo.attributes.phone_number,
      group,
    });
  };

  const getCurrentUser = async () => await Auth.currentAuthenticatedUser();

  return authState === AuthState.SignedIn && user ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position='top-center' />
      {content}
    </ThemeProvider>
  ) : (
    <AmplifyAuthenticator />
  );
};

export default App;
