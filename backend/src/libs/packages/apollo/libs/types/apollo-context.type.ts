import { type PrismaClient } from '@prisma/client';
import { type FastifyReply } from 'fastify/types/reply';
import { type FastifyRequest } from 'fastify/types/request';

import { type IFirebase } from '../../../firebase/firebase.js';
import { type ILogger } from '../../../logger/logger.js';

type ApolloContext = {
  prisma: PrismaClient;
  firebase: IFirebase,
  request: FastifyRequest;
  reply: FastifyReply;
  logger: ILogger;
};

export { type ApolloContext };
