import {gql} from '@apollo/client';

export const CREATE_LOCATION = gql`
  mutation createLocation(
    $pubId: Int!
    $name: String!
    $rows: Int!
    $columns: Int!
  ) {
    createLocation(pubId: $pubId, name: $name, rows: $rows, columns: $columns) {
      id
      name
      pub {
        id
      }
      rows
      columns
      tables {
        id
        locationId
        count
        blocked
        reason
        name
        position
      }
      reservations {
        id
        date
      }
    }
  }
`;

export const UPDATE_LOCATION = gql`
  mutation updateLocation(
    $pubId: Int!
    $name: String!
    $rows: Int!
    $columns: Int!
    $id: Int!
  ) {
    updateLocation(
      pubId: $pubId
      name: $name
      rows: $rows
      columns: $columns
      id: $id
    ) {
      id
      name
      pub {
        id
      }
      rows
      columns
      tables {
        id
        count
        blocked
        reason
        locationId
        position
        name
      }
      reservations {
        id
        date
      }
    }
  }
`;
export const DELETE_LOCATION = gql`
  mutation deleteLocation($id: Int!) {
    deleteLocation(id: $id) {
      id
    }
  }
`;
