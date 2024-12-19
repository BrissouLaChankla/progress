import mongoose from "mongoose";

const CONNECTION_STRING = process.env.CONNECTION_STRING;

if (!CONNECTION_STRING) {
    throw new Error("Please define the CONNECTION_STRING environment variable inside .env.local");
}

// Assurez-vous que global.mongoose est initialisé
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(CONNECTION_STRING, opts).then((mongoose) => {
            return mongoose;
        });
        // Ou, pour éviter d'utiliser .then dans une fonction async, vous pouvez faire :
        // cached.promise = mongoose.connect(CONNECTION_STRING, opts);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connect;
