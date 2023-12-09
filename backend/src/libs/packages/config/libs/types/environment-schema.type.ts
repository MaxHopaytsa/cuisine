import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type EnvironmentSchema = {
  APP: {
    PORT: number;
    ENVIRONMENT: ValueOf<typeof AppEnvironment>;
  };
  DB: {
    DATABASE_URL: string;
  };
  FIREBASE: {
    FIREBASE_TYPE: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_PRIVATE_KEY_ID: string;
    FIREBASE_PRIVATE_KEY: string;
    FIREBASE_CLIENT_EMAIL: string;
  }
};

export { type EnvironmentSchema };
