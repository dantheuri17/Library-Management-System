import express from "express";
import { Router } from "express";
import { ObjectId } from "mongodb";
import cors from "cors";

const router = Router();

router.post("/", async (req, res) => {
	const newBook = req.body;
	const booksCollection = req.app.locals.books;

	try {
		await booksCollection.insertOne(newBook);
		console.log("Book Added");
		res.sendStatus(204);
	} catch (error) {
		console.error("Error handling POST request: ", error);
		res.sendStatus(500);
	}
});

router.get("/:id", cors(), async (req, res) => {
	try {
		const booksCollection = req.app.locals.books;

		const bookId = req.params.id;
		const book = await booksCollection.findOne({
			_id: new ObjectId(bookId),
		});

		if (!book) {
			return res.sendStatus(404).json({ message: "Book Not Found" });
		}
		res.json(book);
	} catch (error) {
		console.error("Error fetching book data:", error);
		res.sendStatus(500);
	}
});

router.put("/edit/:id", cors(), async (req, res) => {
	const bookId = req.params.id;

	const booksCollection = req.app.locals.books;
	const { title, author, genre } = req.body;

	try {
		const updatedBookFields = {
			$set: {},
		};

		if (title) {
			Object.assign(updatedBookFields.$set, { title: title });
		}
		if (author) {
			Object.assign(updatedBookFields.$set, { author: author });
		}
		if (genre) {
			Object.assign(updatedBookFields.$set, { genre: genre });
		}
		console.log("Updated Book Fields", updatedBookFields);

		await booksCollection.updateOne(
			{
				_id: new ObjectId(bookId),
			},
			updatedBookFields
		);
		res.json(updatedBookFields);
	} catch (error) {
		console.error("Error updating book details:", error);
		res.sendStatus(500).json({ message: "Internal Server Error" });
	}
});

router.delete('/delete/:id', async(req,res) => {
    const bookId = req.params.id;

    try {
        const booksCollection = req.app.locals.books; 
        await booksCollection.deleteOne({_id: new ObjectId(bookId)})
        console.log("Member Deleted");
        res.sendStatus(204);
    } catch(error) {
        console.error("Error Deleting Member:", error);
        res.sendStatus(500).json({message: "Internal Server Error"})
    }
})

router.get("/books/search", async (req, res) => {
	const searchQuery = req.query.query.toLowerCase();
	const booksCollection = req.app.locals.books;

	try {
		const searchResults = await booksCollection
			.find({
				$or: [
					{ title: { $regex: searchQuery, $options: "i" } },
					{ author: { $regex: searchQuery, $options: "i" } },
				],
			})
			.toArray();

		res.json(searchResults);
	} catch (error) {
		console.error("Error searching for books:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

export default router;
