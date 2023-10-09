import { ApolloServer } from '@apollo/server';
import { ApolloServerErrorCode } from '@apollo/server/errors';
// import { ApolloServerPluginUsageReporting } from '@apollo/server/plugin/usageReporting';
import {
  fastifyApolloDrainPlugin,
  fastifyApolloHandler,
} from '@as-integrations/fastify';
import { type GraphQLFormattedError } from 'graphql/error/GraphQLError.js';

import { type ILogger } from '../logger/logger.js';
import { type FastifyApp } from '../server-application/server-app.js';
import { type IApollo } from './interfaces/apollo.interface.js';
import { type ApolloContext } from './types/types.js';

const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: (): string => 'Hello, GraphQL!',
  },
};

class Apollo implements IApollo {
  private apolloServer: ApolloServer<ApolloContext>;

  private logger: ILogger;

  private app: FastifyApp;

  public constructor(app: FastifyApp, logger: ILogger) {
    this.logger = logger;
    this.app = app;
    this.apolloServer = this.createApolloServer();
  }

  private createApolloServer(): ApolloServer<ApolloContext> {
    return new ApolloServer({
      typeDefs,
      resolvers,
      formatError: (formattedError): GraphQLFormattedError => {
        if (
          formattedError.extensions &&
          typeof formattedError.extensions.code === 'string'
        ) {
          const code = formattedError.extensions.code;
          this.logger.error(
            `[GraphQLError]: ${code} - ${formattedError.message}`,
          );

          return {
            ...formattedError,
            extensions: { code },
          };
        }
        this.logger.error(formattedError.message);

        return {
          ...formattedError,
          extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
        };
      },
      plugins: [
        fastifyApolloDrainPlugin(this.app),
        // ApolloServerPluginUsageReporting({
        //   sendErrors: { unmodified: true },
        // }),
      ],
    });
  }

  public initApolloRoute(): void {
    this.app.route({
      url: '/graphql',
      method: ['POST', 'GET'],
      handler: fastifyApolloHandler(this.apolloServer, {
        context: async (request, reply): Promise<ApolloContext> => {
          return {
            request,
            reply,
            prisma: this.app.prisma,
          };
        },
      }),
    });
    this.logger.info('Add GraphQL route');
  }

  public async start(): Promise<void> {
    await this.apolloServer.start();
  }
}

export { Apollo };
