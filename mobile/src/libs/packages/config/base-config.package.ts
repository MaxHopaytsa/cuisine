import EnvConfig from 'react-native-config';

import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type Config, type EnvironmentSchema } from './libs/types/types.js';

class BaseConfig implements Config {
  public ENV: EnvironmentSchema;

  public constructor() {
    this.ENV = this.envSchema;
  }

  private get envSchema(): EnvironmentSchema {
    return {
      APP: {
        ENVIRONMENT: EnvConfig['ENVIRONMENT'] as ValueOf<typeof AppEnvironment>,
      },
      API: {
        ORIGIN_URL: EnvConfig['API_URL'] as string,
      },
    };
  }
}

export { BaseConfig };