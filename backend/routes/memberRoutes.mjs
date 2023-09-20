import express, { Router } from "express";
import cors from "cors";
import { ObjectId } from "mongodb";

const router = Router();



router.post("/", cors(), async (req, res) => {

	const newMember = req.body;
	const membersCollection = req.app.locals.members;

	try {
	    await membersCollection.insertOne(newMember);
	    console.log("Member Added");
        res.sendStatus(204);
	}
	catch (error) {
	    console.error("Error handling POST request:", error);
        res.sendStatus(500); 
	}
});

export default router;
