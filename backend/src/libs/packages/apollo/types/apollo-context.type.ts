import { type PrismaClient } from '@prisma/client';
import { type FastifyReply } from 'fastify/types/reply';
import { type FastifyRequest } from 'fastify/types/request';

type ApolloContext = {
  prisma: PrismaClient;
  request: FastifyRequest;
  reply: FastifyReply;
};

export { type ApolloContext };
