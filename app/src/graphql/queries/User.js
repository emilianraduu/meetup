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

export const EXIST_QUERY = gql`
  query($email: String!) {
    exists(email: $email) {
      exist
    }
  }
`;
