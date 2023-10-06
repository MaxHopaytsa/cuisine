import { type ServerAppRouteParameters } from '../types/types.js';

interface IServerAppApi {
  version: string;
  routes: ServerAppRouteParameters[];
  buildFullPath(path: string): string;
}

export { type IServerAppApi };
