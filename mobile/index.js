import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import { App } from './src/libs/components/components';
import { ApolloContext } from './src/libs/packages/apollo/libs/types/apollo-context.type';

AppRegistry.registerComponent(appName, () => App);
