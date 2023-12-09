
import { ApolloServer } from '@apollo/server';
import { ApolloServerErrorCode } from '@apollo/server/errors';
// import { ApolloServerPluginUsageReporting } from '@apollo/server/plugin/usageReporting';
import {
  fastifyApolloDrainPlugin,
  fastifyApolloHandler,
} from '@as-integrations/fastify';
import { getDirectives,MapperKind, mapSchema } from '@graphql-tools/utils';
import { GraphQLError, type GraphQLFormattedError } from 'graphql/error/GraphQLError.js';
import { defaultFieldResolver } from 'graphql/execution/execute.js';
import { type GraphQLSchema } from 'graphql/type/schema.js';

import { type IFirebase } from '../firebase/firebase.js';
import { type ILogger } from '../logger/logger.js';
import { type FastifyApp } from '../server-application/server-app.js';
import { directiveResolvers } from './apollo-directive.resolvers.js';
import { type DirectiveResolvers } from './generate/resolvers-types.js';
import { graphqlApplication } from './graphql-application.js';
import { type IApollo } from './libs/interfaces/apollo.interface.js';
import { type ApolloContext } from './libs/types/types.js';

// const typeDefs = readFileSync('./src/libs/packages/apollo/schema/schema.graphql', { encoding: 'utf8' });

// const schema = makeExecutableSchema({ typeDefs, resolvers });

const schema = graphqlApplication.schema;

class Apollo implements IApollo {
  private apolloServer: ApolloServer<ApolloContext>;

  private logger: ILogger;

  private app: FastifyApp;

  private firebase: IFirebase;

  public constructor(app: FastifyApp, logger: ILogger, firebase: IFirebase) {
    this.logger = logger;
    this.app = app;
    this.firebase = firebase;

    this.apolloServer = this.createApolloServer();
  }

  private attachDirectiveResolvers(
  schema: GraphQLSchema,
  directiveResolvers: DirectiveResolvers
): GraphQLSchema {

  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const newFieldConfig = { ...fieldConfig };

      const directives = getDirectives(schema, fieldConfig);

      for (const directive of directives) {

        const directiveName = directive.name as keyof DirectiveResolvers;
        const resolver = directiveResolvers[directiveName];

        if (resolver) {

          const originalResolver = newFieldConfig.resolve ?? defaultFieldResolver;
          const directiveArguments = directive.args as Record<string, string>;
          newFieldConfig.resolve = (source, originalArguments, context: ApolloContext, info): unknown => {
            return resolver(
              () =>
                new Promise((resolve, reject) => {
                  const result = originalResolver(source, originalArguments, context, info);

                  if (result instanceof GraphQLError) {
                    reject(result);
                  }
                  resolve(result);
                }),
              source,
              directiveArguments,
              context,
              info
            );
          };
        }
      }

      return newFieldConfig;
    }
  });
}

private formatGraphQLError(formattedError: GraphQLFormattedError): GraphQLFormattedError {
  if (formattedError.extensions && typeof formattedError.extensions['code'] === 'string') {
    const code = formattedError.extensions['code'];
    this.logger.error(`[GraphQLError]: ${code} - ${formattedError.message}`);

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
}

  private createApolloServer(): ApolloServer<ApolloContext> {
    return new ApolloServer({
      schema: this.attachDirectiveResolvers(schema, directiveResolvers ),
      formatError: this.formatGraphQLError.bind(this),
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
      url: '/api/v1/graphql',
      method: ['POST', 'GET'],
      handler: fastifyApolloHandler(this.apolloServer, {
        context: async (request, reply): Promise<ApolloContext> => {

          return {
            request,
            reply,
            prisma: this.app.prisma,
            firebase: this.firebase,
            logger: this.logger,
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
