import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { 
   users?: mongoDB.Collection,
   movies?: mongoDB.Collection,
   reviews?: mongoDB.Collection,
   requests?: mongoDB.Collection,
   tokens?: mongoDB.Collection
} = {}

export async function connectToDatabase () {
   dotenv.config({ quiet: true });

   const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGO_URI || '');

   await client.connect();

   const db: mongoDB.Db = client.db(process.env.DB_NAME);

   const usersCollection: mongoDB.Collection = db.collection(process.env.USERS_COLLECTION_NAME || '');
   collections.users = usersCollection;

   const moviesCollection: mongoDB.Collection = db.collection(process.env.MOVIES_COLLECTION_NAME || '');
   collections.movies = moviesCollection

   const reviewsCollection: mongoDB.Collection = db.collection(process.env.REVIEWS_COLLECTION_NAME || '');
   collections.reviews = reviewsCollection

   const requestsCollection: mongoDB.Collection = db.collection(process.env.REQUESTS_COLLECTION_NAME || '');
   collections.requests = requestsCollection

   const tokensCollection: mongoDB.Collection = db.collection(process.env.TOKENS_COLLECTION_NAME || '');
   collections.tokens = tokensCollection

   console.log(`Successfully connected to database: ${db.databaseName}`);
}