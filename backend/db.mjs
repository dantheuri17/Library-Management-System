// db.mjs (ES6 module)

import { MongoClient } from "mongodb";
import session from 'express-session'; 

// Connection URL
const url = "mongodb://127.0.0.1:27017"; 

const client = new MongoClient(url);
let membersCollection; 
let booksCollection; 


async function connectToMongoDB(app) {
	try {
		await client.connect();
		console.log("Connected to MongoDB");
		const librarydb = client.db("librarydb");
		membersCollection = librarydb.collection('members');
		booksCollection = librarydb.collection('books');

		app.locals.members = membersCollection; 
		app.locals.books = booksCollection; 

		app.use(
			session({
					secret: "secret-key", 
					resave: false,
					saveUninitialized: true,
			
			})
		);

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
