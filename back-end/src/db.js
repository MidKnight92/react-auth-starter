import { MongoClient } from 'mongodb';

let client;

export const initializeDbConnection = async () => {
    try {
        client = await MongoClient.connect('mongodb://localhost:27017');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

export const getDbConnection = dbName => {
    const db = client.db(dbName);
    return db;
}