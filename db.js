// db.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI; // your Atlas URI from .env

// This prevents multiple connections during hot reloads or multiple imports
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (global.mongoose.conn) {
    // If connection already exists, return it
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    // Create new connection
    global.mongoose.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}

export default dbConnect;