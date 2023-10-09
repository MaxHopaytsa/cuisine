import { type FastifyReply, type FastifyRequest } from 'fastify';

import { type HttpMethod } from '~/libs/packages/http/http.js';

type ServerAppRouteParameters = {
  path: string;
  method: HttpMethod | HttpMethod[];
  handler: (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => Promise<void> | void;
};

export { type ServerAppRouteParameters };
