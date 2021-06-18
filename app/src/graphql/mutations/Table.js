import {gql} from '@apollo/client';

export const CREATE_TABLE = gql`
  mutation createTable(
    $pubId: Int!
    $name: String!
    $waiterId: Int!
    $count: Int!
    $locationId: Int!
    $position: Int!
  ) {
    createTable(
      pubId: $pubId
      name: $name
      waiterId: $waiterId
      locationId: $locationId
      position: $position
      count: $count
    ) {
      id
      count
      waiterId
      blocked
      reason
      position
      name
      waiter {
        id
        lastName
        firstName
        email
        photo
      }
    }
  }
`;
export const UPDATE_TABLE = gql`
  mutation updateTable(
    $id: Int!
    $count: Int
    $blocked: Boolean
    $reason: String
    $position: Int
    $name: String
    $waiterId: Int
  ) {
    updateTable(
      id: $id
      count: $count
      blocked: $blocked
      reason: $reason
      position: $position
      name: $name
      waiterId: $waiterId
    ) {
      id
      count
      waiterId
      blocked
      locationId
      reason
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
      waiter {
        id
        lastName
        firstName
        email
        photo
      }
    }
  }
`;

export const DELETE_TABLE = gql`
  mutation deleteTable($id: Int!) {
    deleteTable(id: $id) {
      id
    }
  }
`;
