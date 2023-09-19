// db.mjs (ES6 module)

import { MongoClient } from "mongodb";

// Connection URL
const url = "mongodb://127.0.0.1:27017"; // Replace with your MongoDB server URL

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

async function connectToMongoDB() {
	try {
		await client.connect();
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
}

async function closeMongoDBConnection() {
	try {
		await client.close();
		console.log("Connection to MongoDB closed");
	} catch (error) {
		console.error("Error closing MongoDB connection:", error);
	}
}

export { connectToMongoDB, closeMongoDBConnection };
