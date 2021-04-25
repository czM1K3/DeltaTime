import { gql } from "@apollo/client";

export default gql`
    type Query {
        hello: String!
        current: Int!


        timetable(classId: String!): TimeTable
        timetableSingle(classId: String!, day: Int!, lesson: Int!): [String]
    }

    type Mutation {
        updateTimetable(classId: String!): Boolean!
    }

    type TimeTable {
        monday: [[String]]
        tuesday: [[String]]
        wednesday: [[String]]
        thursday: [[String]]
        friday: [[String]]
    }
`;
