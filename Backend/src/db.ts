import { Db, MongoClient } from "mongodb";
import dotenv from 'dotenv'

dotenv.config({ quiet: true })

let client: MongoClient;
let db: Db;

export async function connectDB() {
    if(db) return db

    client = new MongoClient(process.env.MONGO_URI || '')
    await client.connect()
    db = client.db(process.env.DB_NAME)
    console.log(`Conectado ao MongoDB ${db.databaseName}`)
    return db
}

export async function closeDB() {
    if(client) {
        await client.close()
        console.log(`Desconectado do MongoDB ${db.databaseName}`)
    }
}