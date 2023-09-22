import { Router } from "express";
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

router.get("/searchMember", cors(), async (req, res) => {
	const searchQuery = req.query.query;
	console.log(searchQuery);

	try {
		const membersCollection = req.app.locals.members;
		const searchResults = await membersCollection
			.find({ name: { $regex: searchQuery, $options: "i" } })
			.toArray();
		res.json(searchResults);
	} catch (error) {
		console.error("Error searching for members:", error);
		res.status(500);
	}
});

router.get("/:id", cors(), async (req, res) => {
	try {
		const membersCollection = req.app.locals.members;

		const memberId = req.params.id;
		const member = await membersCollection.findOne({
			_id: new ObjectId(memberId),
		});

		if (!member) {
			return res.sendStatus(404);
		}

		res.json(member);
	} catch (error) {
		console.error("Error fetching member:", error);
		res.sendStatus(500);
	}
});

router.put("/edit/:id", async (req, res) => {
	const memberId = req.params.id;
	console.log(memberId);
	const membersCollection = req.app.locals.members;
	const { name, age, role } = req.body;
	console.log(req.body);

	try {
		const updatedMemberFields = {
			$set: {},
		};

		if (name) {
			Object.assign(updatedMemberFields.$set, { name: name });
		}
		if (age) {
			Object.assign(updatedMemberFields.$set, { age: age });
		}
		if (role) {
			Object.assign(updatedMemberFields.$set, { role: role });
		}

		console.log("Updated Fields Object", updatedMemberFields);

		
		await membersCollection.updateOne(
			{ _id: new ObjectId(memberId) },
			updatedMemberFields
		);

		res.status(200);
	} catch (error) {
		console.error("Error updating member details:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

router.delete("/delete/:id", async (req, res) => {
	const memberId = req.params.id;

	try {
		const membersCollection = req.app.locals.members;
		await membersCollection.deleteOne({ _id: new ObjectId(memberId) });
		console.log("Member Deleted");

		res.sendStatus(204);
	} catch (error) {
		console.error("Error Deleting Member:", error);
		res.sendStatus(500).json({ message: "Internal server error" });
	}
});



export default router;
