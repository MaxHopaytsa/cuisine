
import { type IConfig } from '~/libs/packages/config/config.js';

import { type IServerAppApi } from './libs/interfaces/interfaces.js';
import { type ServerAppRouteParameters } from './libs/types/types.js';

class ServerAppApi implements IServerAppApi {
  public version: string;

  public routes: ServerAppRouteParameters[];

  private config: IConfig;

  public constructor(
    version: string,
    config: IConfig,
    ...handlers: ServerAppRouteParameters[]
  ) {
    this.version = version;
    this.config = config;
    this.routes = handlers.map((it) => ({
      ...it,
      path: this.buildFullPath(it.path),
    }));

  }

  public buildFullPath(path: string): string {
    return `/api/${this.version}${path}`;
  }
}

export { ServerAppApi };
