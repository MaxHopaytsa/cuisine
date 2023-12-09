// import { mergeResolvers } from '@graphql-tools/merge';

// import { userResolver } from '~/packages/user/user.resolver.js';

// import { type Resolvers } from './generate/resolvers-types.js';

// const resolvers: Resolvers = mergeResolvers([userResolver]);

// export { resolvers };

import { createApplication } from 'graphql-modules';

import { UserModule } from '~/packages/user/user.js';

const graphqlApplication = createApplication({
  modules: [UserModule],
});

export { graphqlApplication };
