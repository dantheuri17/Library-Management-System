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
	} catch (error) {
		console.error("Error handling POST request:", error);
		res.sendStatus(500);
	}
});

router.get("/:id", cors(), async (req, res) => {
	try {
		const membersCollection = req.app.locals.members;

		const memberId = req.params.id;
		const member = await membersCollection.findOne({ _id: new ObjectId(memberId) });

		if (!member) {
			return res.sendStatus(404).json({ message: "Member not found" });
		}

		console.log(member);

		res.json(member);
	} catch (error) {
		console.error("Error fetching member:", error);
		res.sendStatus(500).json({ message: "Internal server error" });
	}
});



export default router;
