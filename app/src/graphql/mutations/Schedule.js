import {gql} from '@apollo/client';

export const CREATE_SCHEDULE = gql`
  mutation createSchedule(
    $dayOfWeek: String!
    $timeStart: String!
    $timeEnd: String!
    $pubId: Int!
  ) {
    createSchedule(
      dayOfWeek: $dayOfWeek
      timeStart: $timeStart
      timeEnd: $timeEnd
      pubId: $pubId
    ) {
      id
      dayOfWeek
      timeStart
      timeEnd
      pubId
    }
  }
`;

export const UPDATE_SCHEDULE = gql`
  mutation updateSchedule(
    $dayOfWeek: String!
    $timeStart: String!
    $timeEnd: String!
    $pubId: Int!
    $id: Int!
  ) {
    updateSchedule(
      dayOfWeek: $dayOfWeek
      timeStart: $timeStart
      timeEnd: $timeEnd
      pubId: $pubId
      id: $id
    ) {
      id
      dayOfWeek
      timeStart
      timeEnd
      pubId
    }
  }
`;
