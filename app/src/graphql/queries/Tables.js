import {gql} from '@apollo/client';

export const GET_WAITER_TABLES = gql`
  query {
    waiterTables {
      id
      count
      blocked
      reason
      locationId
      waiterId
      position
      name
      reservations {
        id
        date
        confirmed
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
