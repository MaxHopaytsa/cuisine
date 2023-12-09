import { gql } from '~/libs/packages/apollo/generate/gql';

const GET_USER = gql(/* GraphQL */`
  query GetUser{
    user{
      id
      username
      email
    }
  }
  `
);

const SIGNUP_USER = gql(/* GraphQL */`
  mutation SignUpUser($email: String!, $username: String!) {
    signUpUser(email: $email, username: $username) {
      user {
        id
        username
        email
      }
    }
  }
`
);

export { GET_USER, SIGNUP_USER };
