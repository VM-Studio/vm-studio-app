import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB || 'vmstudio';

let client: MongoClient;
let db: Db;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  
  if (!db) {
    db = client.db(dbName);
  }
  
  return { client, db };
}

export async function getDatabase(): Promise<Db> {
  if (!db) {
    const { db: database } = await connectToDatabase();
    return database;
  }
  return db;
}