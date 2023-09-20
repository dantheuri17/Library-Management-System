// BookForm.js

import { useState } from "react";

// eslint-disable-next-line react/prop-types
function BookForm({ onAddBook }) {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [genre, setGenre] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Create a new book object
		const newBook = { title, author, genre };

		try {
			const response = await fetch("http://127.0.0.1:3000/books", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newBook),
			});

			if (!response.ok) {
				throw new Error("Failed to add book");
			}

			// Clear the form fields
			setTitle("");
			setAuthor("");
			setGenre("");

			// Optionally, you can fetch updated book data or perform other actions
			// after adding the book.

			// Call a callback function or update state in your parent component if needed.
			onAddBook(newBook);
		} catch (error) {
			console.error("Error adding book:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			<input
				type="text"
				placeholder="Author"
				value={author}
				onChange={(e) => setAuthor(e.target.value)}
				required
			/>
			<input
				type="text"
				placeholder="Genre"
				value={genre}
				onChange={(e) => setGenre(e.target.value)}
				required
			/>
			<button type="submit">Add Book</button>
		</form>
	);
}

export default BookForm;
