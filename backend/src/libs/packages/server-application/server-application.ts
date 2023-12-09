import { config } from '~/libs/packages/config/config.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { firebase } from '../firebase/firebase.js';
import { ServerApp } from './server-app.js';
import { ServerAppApi } from './server-app-api.js';

const apiV1 = new ServerAppApi('v1', config);

const serverApp = new ServerApp({
  config,
  logger,
  apis: [apiV1],
  firebase,
});

export { type ServerAppRouteParameters } from './libs/types/types.js';
export { serverApp };
