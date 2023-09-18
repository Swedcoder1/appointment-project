import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("Mongoose connected");
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;

// let client;
// let clientPromise;

// //MONGODB CONNECTION
// // if (!process.env.MONGODB_URI) {
// //   throw new Error("Add Mongo URI to .env.local");
// // } else {
// //   console.log("Connected to mongo");
// // }

// // if (process.env.NODE_ENV === "development") {
// //   if (!global._mongoClientPromise) {
// //     client = new MongoClient(uri, options);
// //     global._mongoClientPromise = client.connect();
// //   }
// //   clientPromise = global._mongoClientPromise;
// // } else {
// //   client = new MongoClient(uri, options);
// //   clientPromise = client.connect();
// // }

// //MONGOOSE CONNECTION
// if (!process.env.MONGODB_URI) {
//   throw new Error("Add Mongo URI to .env.local");
// } else {
//   console.log("Connected to mongoose");
// }

// if (process.env.NODE_ENV === "development") {
//   if (!global._mongoClientPromise) {
//     client = mongoose.connect(uri, options);
//     global._mongoClientPromise = client;
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   client = mongoose.connect(uri, options);
//   clientPromise = client;
// }

// export default clientPromise;
