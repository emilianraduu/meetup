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
