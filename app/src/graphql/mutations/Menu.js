import {gql} from '@apollo/client';

export const UPDATE_MENU_SECTION = gql`
  mutation updateMenuSection($name: String, $image: String) {
    updateMenuSection(name: $name, image: $image) {
      id
      name
      image
      items {
        id
        name
        price
        image
      }
    }
  }
`;

export const CREATE_MENU_ITEM = gql`
  mutation createMenuItem(
    $sectionId: Int!
    $price: Float!
    $image: String
    $name: String!
    $description: String!
  ) {
    createMenuItem(
      sectionId: $sectionId
      price: $price
      image: $image
      description: $description
      name: $name
    ) {
      id
      name
      sectionId
      image
      price
      description
    }
  }
`;

export const REMOVE_MENU_ITEM = gql`
  mutation deleteItem($id: Int!) {
    deleteItem(id: $id) {
      id
    }
  }
`;
