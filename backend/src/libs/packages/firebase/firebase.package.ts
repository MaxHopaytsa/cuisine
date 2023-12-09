import * as admin from 'firebase-admin';
import { Injectable, Scope } from 'graphql-modules';

import { type IConfig } from '../config/config.js';
import { type ILogger } from '../logger/logger.js';
import { type IFirebase } from './interfaces/firebase.interface.js';

@Injectable({
  scope: Scope.Operation,
  global: true
})
class Firebase implements IFirebase {
  private admin: admin.app.App;

  private config: IConfig;

  private logger: ILogger;

 public constructor(logger: ILogger, config: IConfig) {

    const serviceAccount = {
      projectId: config.ENV.FIREBASE.FIREBASE_PROJECT_ID,
      privateKey: config.ENV.FIREBASE.FIREBASE_PRIVATE_KEY,
      clientEmail: config.ENV.FIREBASE.FIREBASE_CLIENT_EMAIL,
    };

    this.config = config;

    this.logger = logger;

    this.admin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }

 public async verifyToken(token: string): Promise<admin.auth.DecodedIdToken | null> {
    try {
      return await this.admin.auth().verifyIdToken(token);
    } catch {
      this.logger.error('Firebase token not found');

      return null;
    }
  }
}

export { Firebase };
