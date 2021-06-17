import {gql} from '@apollo/client';

export const GET_WAITER_TABLES = gql`
  query {
    waiterTables {
      id
      count
      blocked
      reason
      locationId
      position
      name
      reservations {
        id
        date
        finished
        user {
          email
          photo
        }
      }
      location {
        id
        rows
        columns
        name
      }
    }
  }
`;
