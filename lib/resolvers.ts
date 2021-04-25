import { getTimetableSingle, getTimetable } from "./fetch";
import { getDeltaTime } from "./time";
import { connectToDatabase } from "../utils/mongodb";

const Query = {
    hello(_parent, _args, _context, _info) {
        return "Hello world";
    },
    async timetable(_parent, args, _context, _info) {
        const { db } = await connectToDatabase();
        const response = await db.collection("timetable").findOne({ classId: args.classId });
        return response.timetable;
    },
    async updateTimetable(_parent, args, _context, _info) {
        const timetable = await getTimetable(args.classId);
        if (!timetable) return false;
        const timetableDb = {
            classId: args.classId + "",
            timetable: {
                monday: timetable[0],
                tuesday: timetable[1],
                wednesday: timetable[2],
                thursday: timetable[3],
                friday: timetable[4],
            }
        }
        ;
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
    async timetableSingle(_parent, args, _context, _info) {
        if (args.day < 0 || args.day > 4 || args.lesson < 0 || args.lesson > 10)
            return null;
        return await getTimetableSingle(args.classId, args.day, args.lesson);
    },
    current() {
        return getDeltaTime();
    }
};

export default { Query };
