// app.mjs (ES6 module)

import express from "express";
import cors from "cors";
import { connectToMongoDB, closeMongoDBConnection } from "./db.mjs";
import memberRoutes from './routes/memberRoutes.mjs';
import bookRoutes from './routes/bookRoutes.mjs';
import checkoutRoutes from './routes/check-outRoutes.mjs';

const app = express();

app.use(express.json());
app.use(cors());

connectToMongoDB(app);

app.get('/members', async(req, res) => {
    const membersCollection = req.app.locals.members;

    const members = await membersCollection.find().toArray(); 

    res.json(members); 
})

app.get('/books', async(req, res) => {
    const booksCollection = req.app.locals.books;

    const books = await booksCollection.find().toArray(); 

    res.json(books); 
})

app.use("/member", memberRoutes);
app.use("/book", bookRoutes);
app.use('/check-out', checkoutRoutes);

app.listen(3000, () => console.log("app is running"));

process.on("SIGINT", () => {
	closeMongoDBConnection();
	process.exit(0);
});
