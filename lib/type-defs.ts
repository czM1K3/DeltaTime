import { gql } from "@apollo/client";

export default gql`
    type Query {
        hello: String!
        bakalari(classId: Int!, day: Int!, lesson: Int!): [String]
    }
`;
