import {gql} from '@apollo/client';

export const CREATE_PUB = gql`
  mutation createPub(
    $name: String!
    $address: String!
    $images: [String]
    $latitude: Float!
    $longitude: Float!
    $currency: String!
  ) {
    createPub(
      name: $name
      address: $address
      currency: $currency
      images: $images
      latitude: $latitude
      longitude: $longitude
    ) {
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
      locations {
        name
        id
        rows
        columns
        tables {
          id
          locationId
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

export const UPDATE_PUB = gql`
  mutation updatePub(
    $name: String
    $address: String
    $images: [String]
    $latitude: Float
    $longitude: Float
    $id: Int!
    $visible: Boolean
    $currency: String
  ) {
    updatePub(
      name: $name
      address: $address
      images: $images
      latitude: $latitude
      longitude: $longitude
      id: $id
      visible: $visible
      currency: $currency
    ) {
      address
      id
      images
      name
      visible
      currency
      ownerId
      priceAvg
      reservationTime
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
      locations {
        name
        id
        rows
        columns
        tables {
          id
          locationId
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

export const CREATE_MENU = gql`
  mutation createMenu($id: Int!) {
    createMenu(pubId: $id) {
      id
      sections {
        id
      }
    }
  }
`;
export const CREATE_MENU_SECTION = gql`
  mutation createMenuSection($menuId: Int!, $name: String!, $image: String) {
    createMenuSection(menuId: $menuId, name: $name, image: $image) {
      id
      name
      image
      items {
        id
      }
    }
  }
`;

export const DELETE_PUB = gql`
  mutation deletePub($id: Int!) {
    deletePub(id: $id) {
      id
    }
  }
`;
