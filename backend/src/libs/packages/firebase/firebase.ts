import { config } from '../config/config.js';
import { logger } from '../logger/logger.js';
import { Firebase } from './firebase.package.js';

const firebase = new Firebase(logger, config);

export { firebase };
export { type IFirebase } from './interfaces/interfaces.js';