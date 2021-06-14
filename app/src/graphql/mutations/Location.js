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
      }
      reservations {
        id
        date
      }
    }
  }
`;
