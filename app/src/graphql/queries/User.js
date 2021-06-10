import {gql} from '@apollo/client';

export const ME_QUERY = gql`
  query {
    me {
      lastName
      email
      firstName
      id
      photo
      maxDistance
      status
    }
  }
`;

export const EXIST_QUERY = gql`
  query($email: String!) {
    exists(email: $email) {
      exist
      email
      firstName
      lastName
      photo
    }
  }
`;
