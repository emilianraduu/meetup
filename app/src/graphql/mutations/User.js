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
          reservationTime
          locations {
            id
            name
            rows
            columns
          }
        }
        reviews {
          id
          rating
          createdAt
          comment
          user {
            email
          }
          pub {
            name
            address
            id
          }
        }
        tables {
          id
          name
          locationId
          position
          count
          waiterId
          reservations {
            id
            date
          }
          location {
            id
            name
            rows
            columns
          }
        }
        friends {
          friend {
            id
            email
            photo
            firstName
            lastName
          }
        }
        reservations {
          id
          date
          confirmed
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
            reservationTime
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
          confirmed
          finished
          location {
            id
            name
            rows
            columns
          }
          table {
            id
            count
          }
          pub {
            id
            reservationTime
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
        status
        firstName
        lastName
      }
    }
  }
`;

export const DELETE_WAITER = gql`
  mutation deleteWaiter($pubId: Int!, $id: Int!) {
    deleteWaiter(pubId: $pubId, id: $id) {
      id
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($userId: Int!, $friendId: Int!) {
    addFriend(userId: $userId, friendId: $friendId) {
      id
      createdAt
      friend {
        email
        id
        firstName
        lastName
        photo
      }
    }
  }
`;
