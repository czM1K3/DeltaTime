import { gql } from "@apollo/client";

export default gql`
    type Query {
        hello: String!
        current: Int!
        bakalari(classId: String!, day: Int!, lesson: Int!): [String]
    }
`;
