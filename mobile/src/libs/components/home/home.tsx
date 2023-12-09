import { useQuery } from '@apollo/client/react/hooks/useQuery';
import React from 'react';
import { Text,View } from 'react-native';

import { gql } from '../../../libs/packages/apollo/generate';

const GET_BOOK = gql(/* GraphQL */`
  query GetBook{
    books{
      title
    }
  }
  `
);

const Home = (): React.JSX.Element => {
  const { loading, data } = useQuery(GET_BOOK);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!data || !data.books) {
    return <Text>No data available.</Text>;
  }

  const books = data.books;

  return (
    <View>
      <Text>Books:</Text>
      {books.map((book, index) => (
        <View key={index}>
          <Text>Title: {book?.title}</Text>
        </View>
      ))}
    </View>
  );
};

export  { Home };
