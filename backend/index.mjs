// app.mjs (ES6 module)

import express from "express";
import cors from "cors";
import { connectToMongoDB, closeMongoDBConnection } from "./db.mjs";

const app = express();
app.use(cors());

connectToMongoDB();

app.listen(5000, () => console.log("app is running"));
