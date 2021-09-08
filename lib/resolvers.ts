import { getTimetable, getAllClasses } from "./fetch";
import { GetDay, getDeltaTime } from "./time";
import { connectToDatabase } from "../utils/mongodb";
import { QueryResolvers, MutationResolvers } from "../.cache/__types__";
import { ResolverContext } from "./apollo";
import scrapeLunch from "./scrapeLunch";

const Query: Required<QueryResolvers<ResolverContext>> = {
    hello: (_parent, _args, _context, _info) => "Hello world",
    timetable: async (_parent, args, _context, _info) => {
        const { db } = await connectToDatabase();
        const response = await db
            .collection("timetable")
            .findOne({ classId: args.classId });
        return response;
    },
    timetableSingle: async (_parent, args, _context, _info) => {
        if (args.day < 0 || args.day > 4 || args.lesson < 0 || args.lesson > 10)
            return null;
        const { db } = await connectToDatabase();
        const response = await db
            .collection("timetable")
            .findOne({ classId: args.classId });
        switch (args.day) {
            case 0:
                return response.timetable.monday[args.lesson];
            case 1:
                return response.timetable.tuesday[args.lesson];
            case 2:
                return response.timetable.wednesday[args.lesson];
            case 3:
                return response.timetable.thursday[args.lesson];
            case 4:
                return response.timetable.friday[args.lesson];
            default:
                return null;
        }
    },
    timetableCurrent: async (_parent, args, _context, _info) => {
        const deltatime = getDeltaTime();
        // const deltatime = 1;
        if (
            deltatime === 11 ||
            deltatime === 12 ||
            deltatime === 0 ||
            args.classId === ""
        )
            return null;
        const day = GetDay() - 1;
        // const day = 0;
        const { db } = await connectToDatabase();
        const response = await db
            .collection("timetable")
            .findOne({ classId: args.classId });
        switch (day) {
            case 0:
                return response.timetable.monday[Math.abs(deltatime)];
            case 1:
                return response.timetable.tuesday[Math.abs(deltatime)];
            case 2:
                return response.timetable.wednesday[Math.abs(deltatime)];
            case 3:
                return response.timetable.thursday[Math.abs(deltatime)];
            case 4:
                return response.timetable.friday[Math.abs(deltatime)];
            default:
                return null;
        }
    },
    current: () => getDeltaTime(),
    allClasses: async (_parent, _args, _context, _info) =>
        await getAllClasses(),
    timetableAll: async (_parent, _args, _context, _info) => {
        const { db } = await connectToDatabase();
        const response = await db.collection("timetable").find().toArray();
        return response;
    },
    lunch: async (_parent, _args, _context, _info) => {
        // const deltatime = getDeltaTime();
        // if (
        //     deltatime === 11 ||
        //     deltatime === 12 ||
        //     deltatime === 0
        // )
        //     return null;
            
        const date = new Date();
        const currentDate = JSON.stringify(date).substring(1, 11);
        
        const { db } = await connectToDatabase();

        const response = await db.collection("lunch").findOne({"date": currentDate});
        if (response) return response;

        const scraped = await scrapeLunch(db);
        if (!scraped) return null;
        const actual = scraped.find(x => x.date === currentDate);
        if (!actual) return null;
        return actual;
    }
};

const Mutation: Required<MutationResolvers<ResolverContext>> = {
    updateTimetable: async (_parent, args, _context, _info) => {
        const { timetable, label } = await getTimetable(args.classId);
        if (!timetable) return false;
        const timetableDb = {
            classId: args.classId + "",
            label: label,
            timetable: {
                monday: timetable[0],
                tuesday: timetable[1],
                wednesday: timetable[2],
                thursday: timetable[3],
                friday: timetable[4],
            },
        };
        const { db } = await connectToDatabase();
        if (
            await db.collection("timetable").findOne({ classId: args.classId })
        ) {
            const response = await db
                .collection("timetable")
                .update({ classId: args.classId }, timetableDb);
            return response.result.ok;
        } else {
            const response = await db
                .collection("timetable")
                .insertOne(timetableDb);
            return response.result.ok;
        }
    },
};

const TimeTable = {
    monday: ({ timetable }) => timetable.monday,
    tuesday: ({ timetable }) => timetable.tuesday,
    wednesday: ({ timetable }) => timetable.wednesday,
    thursday: ({ timetable }) => timetable.thursday,
    friday: ({ timetable }) => timetable.friday,
};

export default { Query, Mutation, TimeTable };
