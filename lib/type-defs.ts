import { gql } from "@apollo/client";

export default gql`
    type Query {
        hello: String!
        current: Int!
        allClasses: [Class]
        timetable(classId: String!): TimeTable
        timetableAll: [TimeTable]
        timetableSingle(classId: String!, day: Int!, lesson: Int!): [String]
    }

    type Mutation {
        updateTimetable(classId: String!): Boolean!
    }

    type TimeTable {
        label: String!
        classId: String!
        monday: [[String]]
        tuesday: [[String]]
        wednesday: [[String]]
        thursday: [[String]]
        friday: [[String]]
    }

    type Class {
        id: String!
        label: String!
    }
`;
