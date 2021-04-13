import { gql } from "@apollo/client";

export default gql`
    type Query {
        hello: String!
        bakalari(classId: String!, day: Int!, lesson: Int!): [String]
    }
`;
