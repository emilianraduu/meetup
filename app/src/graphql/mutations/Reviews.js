import {gql} from '@apollo/client';

export const CREATE_REVIEW = gql`
  mutation createReview($pubId: Int!, $comment: String, $rating: Int!) {
    createReview(rating: $rating, comment: $comment, pubId: $pubId) {
      id
      rating
      comment
      pub {
        name
        address
      }
      createdAt
    }
  }
`;
