import {gql} from '@apollo/client';

export const CREATE_RESERVATION = gql`
  mutation createReservation(
    $pubId: Int!
    $tableId: Int!
    $locationId: Int!
    $date: String!
  ) {
    createReservation(
      pubId: $pubId
      tableId: $tableId
      locationId: $locationId
      date: $date
    ) {
      id
      date
      tableId
      locationId
      pub {
        id
        name
        distance
        address
      }
      location {
        id
        name
      }
      table {
        id
      }
    }
  }
`;
