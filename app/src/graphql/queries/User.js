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
      reservations {
        id
        startHour
        date
        location {
          id
          name
        }
        pub {
          id
          name
          address
        }
      }
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
