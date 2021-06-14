import {gql} from '@apollo/client';

export const PUBS_QUERY = gql`
  query($lat: Float!, $long: Float!, $maxDistance: Int) {
    pubs(latitude: $lat, longitude: $long, maxDistance: $maxDistance) {
      id
      images
      address
      visible
      priceAvg
      currency
      avgRating
      numberOfRatings
      latitude
      reservationTime
      longitude
      name
      distance
      reservations {
        id
        date
        table {
          id
          count
        }
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
          reservations {
            id
            date
            tableId
          }
        }
      }
    }
  }
`;

export const MY_PUBS_QUERY = gql`
  query {
    myPubs {
      id
      images
      address
      visible
      priceAvg
      currency
      avgRating
      numberOfRatings
      latitude
      reservationTime
      longitude
      name
      distance
      reservations {
        id
        date
        table {
          id
          count
        }
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
          reservations {
            id
            date
            tableId
          }
        }
      }
    }
  }
`;

export const PUB_QUERY = gql`
  query($id: Int!, $latitude: Float, $longitude: Float) {
    pub(id: $id, latitude: $latitude, longitude: $longitude) {
      address
      visible
      id
      images
      name
      currency
      reservationTime
      ownerId
      priceAvg
      avgRating
      numberOfRatings
      distance
      latitude
      longitude
      schedule {
        id
        timeEnd
        timeStart
      }
      reservations {
        id
        date
        tableId
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
          reservations {
            id
            date
            tableId
          }
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
