import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

dotenv.config({ quiet: true });

export const collections: { 
   users?: mongoDB.Collection,
   movies?: mongoDB.Collection,
   reviews?: mongoDB.Collection,
   requests?: mongoDB.Collection,
   tokens?: mongoDB.Collection
} = {}

let client: mongoDB.MongoClient | null = null;
let db: mongoDB.Db | null = null;

export async function connectToDatabase () {
   if (db) {
        return;
    }

   client = new mongoDB.MongoClient(process.env.MONGO_URI!, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });

   await client.connect();

   db = client.db(process.env.DB_NAME)

   collections.users = db.collection(process.env.USERS_COLLECTION_NAME!);
   collections.movies = db.collection(process.env.MOVIES_COLLECTION_NAME!);
   collections.reviews = db.collection(process.env.REVIEWS_COLLECTION_NAME!);
   collections.requests = db.collection(process.env.REQUESTS_COLLECTION_NAME!);
   collections.tokens = db.collection(process.env.TOKENS_COLLECTION_NAME!);
}