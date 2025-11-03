import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongooseConn: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

const  MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) throw new Error("❌ MONGODB_URI not defined in environment variables.");

let cached = global.mongooseConn || { conn: null, promise: null };
global.mongooseConn = cached;

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}