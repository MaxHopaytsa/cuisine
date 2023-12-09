import { ApolloProvider } from '@apollo/client/react/context/ApolloProvider';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';

import { Toast } from '~/libs/components/components';
import { useEffect } from '~/libs/hooks/hooks';
import { apollo } from '~/libs/packages/apollo/apollo';
import { store } from '~/libs/packages/store/store';

import { StoreProvider } from '../components';
import { Home } from '../home/home';
import { SPLASH_SCREEN_HIDE_TIMEOUT } from './libs/constants/constants';

const App: React.FC = () => {

  useEffect(() => {
    const splashScreenTimer = setTimeout(() => {
      SplashScreen.hide();
    }, SPLASH_SCREEN_HIDE_TIMEOUT);

    return () => {
      clearTimeout(splashScreenTimer);
    };
  }, []);

  return(
    <StoreProvider store={store.instance}>
    <ApolloProvider client={apollo}>
    <NavigationContainer>
  <Home />
  </NavigationContainer>
  <Toast />
  </ApolloProvider>
  </StoreProvider>
  );
};

export { App };
