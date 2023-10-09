import { type PrismaClient } from '@prisma/client';
import { type FastifyPluginAsync } from 'fastify/types/plugin.js';
import fp from 'fastify-plugin';

import { logger } from '../logger/logger.js';
import { prisma } from './prisma.js';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async (app) => {
  await prisma.$connect();
  logger.info('connecting Prisma');
  app.decorate('prisma', prisma);

  app.addHook('onClose', async (app) => {
    logger.info('disconnecting Prisma from DB');
    await app.prisma.$disconnect();
  });
});

export { prismaPlugin };
