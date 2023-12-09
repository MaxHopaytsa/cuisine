import 'reflect-metadata';
import 'graphql-import-node';

import { serverApp } from '~/libs/packages/server-application/server-application.js';

await serverApp.init();
