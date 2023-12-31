import convict, { type Config as TConfig } from 'convict';
import { config } from 'dotenv';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { ConfigValidationError } from '~/libs/exceptions/exceptions.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { type IConfig } from './libs/interfaces/interfaces.js';
import { type EnvironmentSchema } from './libs/types/types.js';

class Config implements IConfig {
  private logger: ILogger;

  public ENV: EnvironmentSchema;

  public constructor(logger: ILogger) {
    this.logger = logger;

    config();

    this.envSchema.load({});
    this.envSchema.validate({
      allowed: 'strict',
      output: (message) => this.logger.info(message),
    });

    this.ENV = this.envSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  private get envSchema(): TConfig<EnvironmentSchema> {
    convict.addFormat({
      name: 'boolean_string',
      validate: (value: string, schema: convict.SchemaObj) => {
        if (value !== 'true' && value !== 'false') {
          throw new ConfigValidationError({
            message: `Invalid ${schema.env ?? ''} format`,
          });
        }
      },
    });

    return convict<EnvironmentSchema>({
      APP: {
        ENVIRONMENT: {
          doc: 'Application environment',
          format: Object.values(AppEnvironment),
          env: 'NODE_ENV',
          default: null,
        },
        PORT: {
          doc: 'Port for incoming connections',
          format: Number,
          env: 'PORT',
          default: null,
        },
      },
      DB: {
        DATABASE_URL: {
          doc: 'Database connection string',
          format: String,
          env: 'DATABASE_URL',
          default: null,
        },
      },
      FIREBASE: {
        FIREBASE_TYPE: {
          doc: 'Firebase type string',
          format: String,
          env: 'FIREBASE_TYPE',
          default: null,
        },
        FIREBASE_PRIVATE_KEY: {
          doc: 'Firebase private key string',
          format: String,
          env: 'FIREBASE_PRIVATE_KEY',
          default: null,
        },
        FIREBASE_PROJECT_ID: {
          doc: 'Firebase project id',
          format: String,
          env: 'FIREBASE_PROJECT_ID',
          default: null,
        },
        FIREBASE_PRIVATE_KEY_ID: {
          doc: 'Firebase private key id',
          format: String,
          env: 'FIREBASE_PRIVATE_KEY_ID',
          default: null,
        },
        FIREBASE_CLIENT_EMAIL: {
          doc: 'Firebase client email string',
          format: String,
          env: 'FIREBASE_CLIENT_EMAIL',
          default: null,
        }
      }
    });
  }
}

export { Config };
