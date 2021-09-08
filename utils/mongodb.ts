import { MongoClient, Db } from "mongodb";

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

if (!MONGODB_DB) {
    throw new Error(
        "Please define the MONGODB_DB environment variable inside .env.local"
    );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
//@ts-ignore
let cached = global.mongo;

if (!cached) {
    //@ts-ignore
    cached = global.mongo = { conn: null, promise: null };
}

type MyMongoClient = {
    client: MongoClient;
    db: Db;
};

export const connectToDatabase = async (): Promise<MyMongoClient> => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        cached.promise = MongoClient.connect(MONGODB_URI, opts).then(
            (client) => {
                return {
                    client,
                    db: client.db(MONGODB_DB),
                };
            }
        );
    }
    cached.conn = await cached.promise;
    return cached.conn;
};
