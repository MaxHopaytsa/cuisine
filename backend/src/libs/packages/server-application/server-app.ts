import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import Fastify, {
  type FastifyError,
  type FastifySchema,
  type onRequestHookHandler,
  type preHandlerHookHandler,
  type preValidationHookHandler,
} from 'fastify';

import { ServerErrorType } from '~/libs/enums/enums.js';
import { type IConfig } from '~/libs/packages/config/config.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { type ServerCommonErrorResponse } from '~/libs/types/types.js';

import { Apollo, type IApollo } from '../apollo/apollo.js';
import { HttpCode, HttpError } from '../http/http.js';
import { prismaPlugin } from '../prisma/prisma.plugin.js';
import {
  type IServerApp,
  type IServerAppApi,
} from './libs/interfaces/interfaces.js';
import { type ServerAppRouteParameters } from './libs/types/types.js';

type Constructor = {
  config: IConfig;
  logger: ILogger;
  apis: IServerAppApi[];
};

type FastifyApp = ReturnType<typeof Fastify>;

class ServerApp implements IServerApp {
  private config: IConfig;

  private logger: ILogger;

  private app: FastifyApp;

  private apis: IServerAppApi[];

  private apollo: IApollo;

  public constructor({ config, logger, apis }: Constructor) {
    this.config = config;
    this.logger = logger;
    this.app = Fastify();
    this.apis = apis;

    this.apollo = new Apollo(this.app, this.logger);
  }

  public addRoute(parameters: ServerAppRouteParameters): void {
    const { path, method, handler } = parameters;

    const onRequests: onRequestHookHandler[] = [];
    const preHandler: preHandlerHookHandler[] = [];
    const preValidations: preValidationHookHandler[] = [];
    const schema: FastifySchema = {};

    this.app.route({
      url: path,
      method,
      handler,
      onRequest: onRequests,
      preHandler,
      preValidation: preValidations,
      schema,
    });
    this.logger.info(`Route: ${method as string} ${path} is registered`);
  }

  public addRoutes(parameters: ServerAppRouteParameters[]): void {
    for (const it of parameters) {
      this.addRoute(it);
    }
  }

  public initRoutes(): void {
    const routers = this.apis.flatMap((it) => it.routes);

    this.addRoutes(routers);
  }

  public async initMiddlewares(): Promise<void> {
    await this.app.register(cors);

    await this.app.register(prismaPlugin);
  }

  private async initServe(): Promise<void> {
    const staticPath = join(
      dirname(fileURLToPath(import.meta.url)),
      '../../../public',
    );

    await this.app.register(fastifyStatic, {
      root: staticPath,
      prefix: '/',
    });

    this.app.setNotFoundHandler(async (_request, response) => {
      await response.sendFile('index.html', staticPath);
    });
  }

  private initErrorHandler(): void {
    this.app.setErrorHandler((error: FastifyError, _request, replay) => {
      if (error instanceof HttpError) {
        this.logger.error(
          `[Http Error]: ${error.status.toString()} – ${error.message}`,
        );

        const response: ServerCommonErrorResponse = {
          errorType: ServerErrorType.COMMON,
          message: error.message,
        };

        return replay.status(error.status).send(response);
      }

      this.logger.error(error.message);

      const response: ServerCommonErrorResponse = {
        errorType: ServerErrorType.COMMON,
        message: error.message,
      };

      return replay.status(HttpCode.INTERNAL_SERVER_ERROR).send(response);
    });
  }

  public async init(): Promise<void> {
    this.logger.info('Application initialization…');

    await this.apollo.start();

    this.logger.info('Start apollo server');

    await this.initServe();

    await this.initMiddlewares();

    this.initErrorHandler();

    this.initRoutes();

    this.apollo.initApolloRoute();

    await this.app
      .listen({
        port: this.config.ENV.APP.PORT,
      })
      .catch((error: Error) => {
        this.logger.error(error.message, {
          cause: error.cause,
          stack: error.stack,
        });
      });

    this.logger.info(
      `Application is listening on PORT – ${this.config.ENV.APP.PORT.toString()}, on ENVIRONMENT – ${
        this.config.ENV.APP.ENVIRONMENT as string
      }.`,
    );
  }
}

export { type FastifyApp, ServerApp };
