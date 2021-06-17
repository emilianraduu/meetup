import {gql} from '@apollo/client';

export const ME_QUERY = gql`
  query {
    me {
      lastName
      email
      firstName
      id
      photo
      status
      tables {
        id
        locationId
        count
        position
        location {
          id
          name
          rows
          columns
        }
      }
      pub {
        id
        name
      }
      reservations {
        id
        date
        table {
          id
          count
        }
        finished
        location {
          id
          name
        }
        pub {
          id
          name
          visible
          latitude
          longitude
          address
          locations {
            rows
            columns
            id
            name
          }
        }
      }
    }
  }
`;

export const EXIST_QUERY = gql`
  query($email: String!) {
    exists(email: $email) {
      exist
      user {
        id
        email
        firstName
        lastName
        photo
      }
      hasPassword
    }
  }
`;
