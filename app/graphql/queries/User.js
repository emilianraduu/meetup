import gql from 'graphql-tag';

export const ME_QUERY = gql`
  query {
    me {
      lastName
      email
      firstName
    }
  }
`;
