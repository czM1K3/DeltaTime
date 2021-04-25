import { getTimetable, getAllClasses } from "./fetch";
import { getDeltaTime } from "./time";
import { connectToDatabase } from "../utils/mongodb";

const Query = {
    hello(_parent, _args, _context, _info) {
        return "Hello world";
    },
    async timetable(_parent, args, _context, _info) {
        const { db } = await connectToDatabase();
        const response = await db.collection("timetable").findOne({ classId: args.classId });
        return response;
    },
    async timetableSingle(_parent, args, _context, _info) {
        if (args.day < 0 || args.day > 4 || args.lesson < 0 || args.lesson > 10)
            return null;
        const { db } = await connectToDatabase();
        const response = await db.collection("timetable").findOne({ classId: args.classId });
        switch (args.day) {
            case 0: return response.timetable.monday[args.lesson];
            case 1: return response.timetable.tuesday[args.lesson];
            case 2: return response.timetable.wednesday[args.lesson];
            case 3: return response.timetable.thursday[args.lesson];
            case 4: return response.timetable.friday[args.lesson];
            default: return null;
        }
    },
    current() {
        return getDeltaTime();
    },
    async allClasses(_parent, _args, _context, _info) {
        return await getAllClasses();
    },
    async timetableAll(_parent, _args, _context, _info) {
        const { db } = await connectToDatabase();
        const response = await db.collection("timetable").find().toArray();
        return response;
    }
};

const Mutation = {
    async updateTimetable(_parent, args, _context, _info) {
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
            }
        };
        const { db } = await connectToDatabase();
        if (await db.collection("timetable").findOne({classId: args.classId})){
            const response = await db.collection("timetable").update({classId: args.classId}, timetableDb);
            return response.result.ok;
        }
        else {
            const response = await db.collection("timetable").insertOne(timetableDb);
            return response.result.ok;
        }
    },
}

const TimeTable = {
    monday: ({timetable}) => timetable.monday,
    tuesday: ({timetable}) => timetable.tuesday,
    wednesday: ({timetable}) => timetable.wednesday,
    thursday: ({timetable}) => timetable.thursday,
    friday: ({timetable}) => timetable.friday
}

export default { Query, Mutation, TimeTable };
