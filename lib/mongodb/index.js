import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

//MONGODB CONNECTION
// if (!process.env.MONGODB_URI) {
//   throw new Error("Add Mongo URI to .env.local");
// } else {
//   console.log("Connected to mongo");
// }

// if (process.env.NODE_ENV === "development") {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

//MONGOOSE CONNECTION
if (!process.env.MONGODB_URI) {
  throw new Error("Add Mongo URI to .env.local");
} else {
  console.log("Connected to mongoose");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = mongoose.connect(uri, options);
    global._mongoClientPromise = client;
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = mongoose.connect(uri, options);
  clientPromise = client;
}

export default clientPromise;
