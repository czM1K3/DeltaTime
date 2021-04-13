import { getData } from "./fetch";
import { getDeltaTime } from "./time";

const Query = {
    hello(_parent, _args, _context, _info) {
        return "Hello world";
    },
    async bakalari(_parent, args, _context, _info) {
        if (args.day < 0 || args.day > 4 || args.lesson < 0 || args.lesson > 10)
            return null;
        return await getData(args.classId, args.day, args.lesson);
    },
    current() {
        return getDeltaTime();
    }
};

export default { Query };