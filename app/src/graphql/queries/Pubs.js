import {gql} from '@apollo/client';

export const PUBS_QUERY = gql`
  query($lat: Float!, $long: Float!) {
    pubs(latitude: $lat, longitude: $long) {
      id
      images
      address
      priceAvg
      currency
      avgRating
      numberOfRatings
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
      currency
      images
      address
      priceAvg
      avgRating
      numberOfRatings
      freeTable
      latitude
      longitude
      name
      distance
    }
  }
`;

export const PUB_QUERY = gql`
  query($id: Int!, $latitude: Float, $longitude: Float) {
    pub(id: $id, latitude: $latitude, longitude: $longitude) {
      address
      id
      images
      name
      currency
      ownerId
      priceAvg
      avgRating
      numberOfRatings
      distance
      freeTable
      latitude
      longitude
      schedule {
        id
        timeEnd
        timeStart
      }
      locations {
        name
        id
        rows
        columns
        tables {
          id
          count
          blocked
          reason
          position
          name
        }
      }
      reviews {
        id
        rating
        comment
        userId
        user {
          lastName
          firstName
          photo
        }
      }
      waiters {
        id
        firstName
        lastName
        email
        photo
      }
      menu {
        id
        sections {
          id
          name
          items {
            name
            id
            price
            image
            description
          }
        }
      }
    }
  }
`;
