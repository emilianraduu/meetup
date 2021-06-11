import {gql} from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        lastName
        email
        firstName
        id
        photo
        maxDistance
        status
      }
    }
  }
`;
export const REGISTER_MUTATION = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      accessToken
      user {
        lastName
        email
        firstName
        id
        photo
        maxDistance
        status
      }
    }
  }
`;

export const UPDATE_PHOTO_MUTATION = gql`
  mutation update($id: Int!, $photo: String) {
    updateUser(id: $id, photo: $photo) {
      lastName
      email
      firstName
      id
      photo
      maxDistance
      status
    }
  }
`;

export const UPDATE_DATA_MUTATION = gql`
  mutation update(
    $id: Int!
    $firstName: String
    $lastName: String
    $maxDistance: Int
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      maxDistance: $maxDistance
    ) {
      lastName
      email
      firstName
      id
      photo
      maxDistance
      status
    }
  }
`;

export const CREATE_WAITER = gql`
  mutation createWaiter($email: String!, $pubId: Int!) {
    createWaiter(email: $email, pubId: $pubId) {
      id
      email
      photo
      firstName
      lastName
    }
  }
`;
