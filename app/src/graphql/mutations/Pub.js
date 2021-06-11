import {gql} from '@apollo/client';

export const CREATE_PUB = gql`
  mutation createPub(
    $name: String!
    $address: String!
    $images: [String]
    $latitude: Float!
    $longitude: Float!
  ) {
    createPub(
      name: $name
      address: $address
      images: $images
      latitude: $latitude
      longitude: $longitude
    ) {
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
  ) {
    updatePub(
      name: $name
      address: $address
      images: $images
      latitude: $latitude
      longitude: $longitude
      id: $id
    ) {
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
