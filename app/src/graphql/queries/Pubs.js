import gql from 'graphql-tag';

export const PUBS_QUERY = gql`
  query($lat: Int!, $long: Int!) {
    pubs(latitude: $lat, longitude: $long) {
      id
      images
      address
    }
  }
`;
