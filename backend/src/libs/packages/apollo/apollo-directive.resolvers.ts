import { GraphQLError } from 'graphql/error/GraphQLError.js';

import { validationNameToSchema } from '~/libs/maps/maps.js';

import { HttpCode, HttpMessage } from '../http/http.js';
import { type DirectiveResolvers,type NextResolverFn as NextResolverFunction, } from './generate/resolvers-types.js';

const directiveResolvers: DirectiveResolvers = {
  auth: async (next: NextResolverFunction<unknown>, _, __, context ) => {

    const token =  context.request.headers.authorization;

    if ( !token ){

      throw new GraphQLError( HttpMessage.UNAUTHORIZED, {
        extensions: {
          code: HttpCode.UNAUTHORIZED,
        }
      });
    }

      const user = await context.firebase.verifyToken(token);

      if ( !user ) {

        throw new GraphQLError( HttpMessage.INVALID_JWT, {
          extensions: {
            code: HttpCode.BAD_REQUEST
          }
        });
      }

      return await next();

  },
  validation: async (next: NextResolverFunction<unknown>, source, arguments_, _, info) => {

    const { schemaName } = arguments_;
    const inputData = source[info.fieldName];

    if(schemaName){

    const schema = validationNameToSchema[schemaName];

    const validatedData = schema.parse(inputData);

    }

    return await next();
  }
};

export { directiveResolvers };
