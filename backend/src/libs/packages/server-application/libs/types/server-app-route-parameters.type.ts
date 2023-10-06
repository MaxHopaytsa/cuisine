
import { type ApolloServer,type BaseContext } from '@apollo/server';
import { type ApolloFastifyHandlerOptions,type fastifyApolloHandler } from '@as-integrations/fastify';
import { type FastifyReply, type FastifyRequest,type RouteHandlerMethod } from 'fastify';

import { type HttpMethod } from '~/libs/packages/http/http.js';

type ServerAppRouteParameters = {
  path: string;
  method: HttpMethod | HttpMethod[];
  handler: ((
    request: FastifyRequest,
    reply: FastifyReply,
  ) => Promise<void> | void); 
};

export { type ServerAppRouteParameters };
