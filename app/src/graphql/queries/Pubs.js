import gql from 'graphql-tag';

export const PUBS_QUERY = gql`
  query($lat: Float!, $long: Float!) {
    pubs(latitude: $lat, longitude: $long) {
      id
      images
      address
      priceAvg
      avgRating
      freeTable
      latitude
      longitude
      name
      distance
    }
  }
`;

export const MY_PUBS_QUERY = gql`
  query {
    myPubs {
      id
      images
      address
      priceAvg
      avgRating
      freeTable
      latitude
      longitude
      name
      distance
    }
  }
`;
