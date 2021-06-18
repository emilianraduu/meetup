import {gql} from '@apollo/client';

export const ME_QUERY = gql`
  query {
    me {
      lastName
      email
      firstName
      id
      photo
      status
      friends {
        friend {
          id
          email
          photo
          firstName
          lastName
        }
      }
      tables {
        id
        locationId
        waiterId
        count
        position
        location {
          id
          name
          rows
          columns
        }
      }
      pub {
        id
        name
        reservationTime
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
      reservations {
        id
        date
        table {
          id
          waiterId
          count
        }
        finished
        confirmed
        location {
          id
          name
        }
        pub {
          id
          name
          visible
          latitude
          reservationTime
          longitude
          address
          locations {
            rows
            columns
            id
            name
          }
        }
      }
    }
  }
`;

export const EXIST_QUERY = gql`
  query($email: String!) {
    exists(email: $email) {
      exist
      user {
        id
        email
        firstName
        lastName
        photo
      }
      hasPassword
    }
  }
`;

export const FIND_USERS = gql`
  query($email: String!) {
    findUsers(email: $email) {
      email
      id
      firstName
      lastName
      photo
    }
  }
`;
export const GET_FRIENDS = gql`
  {
    findFriends {
      id
      createdAt
      friend {
        email
        id
        photo
        firstName
        lastName
      }
    }
  }
`;
