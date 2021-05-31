import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        id
        lastName
        firstName
      }
    }
  }
`;
export const REGISTER_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      accessToken
      user {
        id
        email
      }
    }
  }
`;
