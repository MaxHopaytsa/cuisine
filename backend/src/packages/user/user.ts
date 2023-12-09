import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { createModule } from 'graphql-modules';

import { Firebase } from '~/libs/packages/firebase/firebase.package.js';
import { Logger } from '~/libs/packages/logger/logger.package.js';

import { UserResolver } from './user.resolver.js';
import UserSchemaType from './user.schema.graphql';

const UserModule = createModule({
  id: 'user-module',
  dirname: dirname(fileURLToPath(import.meta.url)),
  typeDefs: [UserSchemaType],
  resolvers: [UserResolver],
  providers: [Firebase, Logger]
});

export {
  userSignInValidationSchema,
  userSignUpValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';
export { UserModule };
