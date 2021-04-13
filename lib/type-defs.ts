import { gql } from "@apollo/client";

export default gql`
    type Query {
        hello: String!
        current: Int!
        timetable(classId: String!): [[[String]]]
        timetableSingle(classId: String!, day: Int!, lesson: Int!): [String]
    }
`;
