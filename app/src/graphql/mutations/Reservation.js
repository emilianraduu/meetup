import {gql} from '@apollo/client';

export const CREATE_RESERVATION = gql`
  mutation createReservation(
    $pubId: Int!
    $tableId: Int!
    $locationId: Int!
    $date: String!
    $waiterId: Int!
  ) {
    createReservation(
      pubId: $pubId
      tableId: $tableId
      locationId: $locationId
      date: $date
      waiterId: $waiterId
    ) {
      id
      date
      tableId
      locationId
      pub {
        id
        reservationTime
        name
        latitude
        longitude
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

export const UPDATE_RESERVATION = gql`
  mutation updateReservation(
    $id: Int!
    $finished: Boolean
    $confirmed: Boolean
  ) {
    updateReservation(confirmed: $confirmed, finished: $finished, id: $id) {
      id
      date
      tableId
      confirmed
      finished
      locationId
      pub {
        id
        reservationTime
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
