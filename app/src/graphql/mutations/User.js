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
        status
        pub {
          id
          name
          locations {
            id
            name
          }
        }
        tables {
          id
          name
          location {
            id
            name
          }
        }
        reservations {
          id
          date
          finished
          location {
            id
            name
          }
          table {
            id
            count
          }
          pub {
            id
            latitude
            longitude
            name
            latitude
            longitude
            address
          }
        }
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
        status
        reservations {
          id
          date
          finished
          location {
            id
            name
          }
          table {
            id
            count
          }
          pub {
            id
            name
            latitude
            longitude
            address
          }
        }
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
      status
    }
  }
`;

export const UPDATE_DATA_MUTATION = gql`
  mutation update($id: Int!, $firstName: String, $lastName: String) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName) {
      lastName
      email
      firstName
      id
      photo
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

export const REGISTER_WAITER = gql`
  mutation setWaiterPassword($id: Int!, $password: String!) {
    setWaiterPassword(id: $id, password: $password) {
      accessToken
      user {
        id
        email
        photo
        firstName
        lastName
      }
    }
  }
`;
