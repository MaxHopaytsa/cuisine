import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';

import { storage, StorageKey } from '../storage/storage';
import { type ApolloContext } from './apollo';
import { gql } from './generate/gql';

const httpLink = createHttpLink({
  uri: 'https://8d90-212-86-97-92.ngrok-free.app/api/v1/graphql',
});

const authLink = new ApolloLink(  (operation, forward) => {
  const { hasAuth } = operation.getContext() as ApolloContext;

  if (hasAuth) {

    operation.setContext( async () => {
      const token = await storage.get(StorageKey.TOKEN);

      return{
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    };}
    );
  }

  return forward(operation);
});

const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const GET_BOOK = gql(/* GraphQL */`
  query GetBook{
    books{
      title
    }
  }
  `
);

apolloClient.query({
  query: GET_BOOK,
  context: {
    hasAuth: true,
  },
})
  .then(result => {
    // Обробка результатів запиту
  })
  .catch(error => {
    // Обробка помилок запиту
  });

export { apolloClient };
