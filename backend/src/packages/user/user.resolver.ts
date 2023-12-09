import { type Resolvers } from '~/libs/packages/apollo/generate/resolvers-types.js';

import { type UserModule } from './generated/module-types.js';

const UserResolver: UserModule.Resolvers = {
  Query: {
    user: async (_, __, context) => {
     return await context.prisma.user.findFirst();
    }
  },
  Mutation: {
    signUpUser: async (_, { input }, context) => {

      const data =  await context.prisma.user.create({ data: { email: input.email, name: input.username } });

      return {
        user: data
      };
    },
    },
    UserMutationResponse: {
      user: (parent) => parent.user ?? null,
    },
};

export { UserResolver };
