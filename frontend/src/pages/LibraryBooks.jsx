// LibraryBooks.js

import { useState } from "react";
import BookForm from "../components/BookForm";

function LibraryBooks() {
	const [books, setBooks] = useState([]);

	const addBook = (newBook) => {
		// Add the new book to the list of books
		setBooks([...books, newBook]);
	};

	return (
		<div className="Library">
			<h1>Library Management System</h1>
			<BookForm onAddBook={addBook} />
			<h2>Library Books</h2>
			<ul>
				{books.map((book, index) => (
					<li key={index}>
						Title: {book.title}, Author: {book.author}, Genre: {book.genre}
					</li>
				))}
			</ul>
		</div>
	);
}

export default LibraryBooks;
