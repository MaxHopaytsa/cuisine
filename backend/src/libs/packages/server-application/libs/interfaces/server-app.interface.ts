import { type ServerAppRouteParameters } from '../types/types.js';

interface IServerApp {
  addRoute(parameters: ServerAppRouteParameters): void;
  initGraphQLRoute(): void;
  // addRoutes(parameters: ServerAppRouteParameters[]): void;
}

export { type IServerApp };
