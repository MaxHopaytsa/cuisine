import * as Types from "../../../generated/schema-types";
import * as gm from "graphql-modules";
export namespace UserModule {
  interface DefinedFields {
    Query: 'user';
    Mutation: 'signUpUser';
    User: 'id' | 'username' | 'email';
    UserMutationResponse: 'code' | 'success' | 'message' | 'user';
  };
  
  interface DefinedInputFields {
    SignUpInput: 'username' | 'email' | 'password' | 'confirmedPassword';
  };
  
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type User = Pick<Types.User, DefinedFields['User']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type UserMutationResponse = Pick<Types.UserMutationResponse, DefinedFields['UserMutationResponse']>;
  export type SignUpInput = Pick<Types.SignUpInput, DefinedInputFields['SignUpInput']>;
  
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User'] | '__isTypeOf'>;
  export type UserMutationResponseResolvers = Pick<Types.UserMutationResponseResolvers, DefinedFields['UserMutationResponse'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    User?: UserResolvers;
    UserMutationResponse?: UserMutationResponseResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      user?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      signUpUser?: gm.Middleware[];
    };
    User?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      username?: gm.Middleware[];
      email?: gm.Middleware[];
    };
    UserMutationResponse?: {
      '*'?: gm.Middleware[];
      code?: gm.Middleware[];
      success?: gm.Middleware[];
      message?: gm.Middleware[];
      user?: gm.Middleware[];
    };
  };
}