import { gql } from "@apollo/client";

export default gql`
    type Query {
        hello: String!
        current: Int!
        allClasses: [Class]
        timetable(classId: String!): TimeTable
        timetableAll: [TimeTable]
        timetableSingle(classId: String!, day: Int!, lesson: Int!): [String]
        timetableCurrent(classId: String!): [String]
        lunch: Lunch
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
        label: String!
        classId: String!
    }

    type Lunch {
        soup: String!
        lunch1: String!
        lunch2: String!
        lunch3: String!
        extra: String!
    }
`;
