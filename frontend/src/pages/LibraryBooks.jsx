import { useState, useEffect } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";

function LibraryBooks() {
	const [books, setBooks] = useState([]);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [genre, setGenre] = useState("");

	useEffect(() => {
		fetch("http://localhost:3000/books")
			.then((response) => response.json())
			.then((data) => {
				setBooks(data);
			})
			.catch((error) => {
				console.error("Error fetching books:", error);
			});
	}, []);

	const columns = [
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
			render: (text, record) => <Link to={`/book/${record._id}`}>{text}</Link>,
		},
		{
			title: "Author",
			dataIndex: "author",
			key: "author",
		},
		{
			title: "Genre",
			dataIndex: "genre",
			key: "genre",
		},
		{
			title: "Actions",
			dataIndex: "actions",
			key: "actions",
			render: (text, record) => (
				<Popconfirm
					title="Are you sure you want to delete this book?"
					onConfirm={() => handleDeleteBook(record._id)}
					okText="Yes"
					cancelText="No"
				>
					<Button type="danger">Delete</Button>
				</Popconfirm>
			),
		},
	];

	const handleDeleteBook = (bookId) => {
		fetch(`http://localhost:3000/book/delete/${bookId}`, {
			method: "DELETE",
		})
			.then((response) => {
				if (response.ok) {
					setBooks(books.filter((book) => book._id !== bookId));
					message.success(`Book with ID ${bookId} deleted successfully`);
				} else {
					message.error(`Failed to delete book with ID ${bookId}`);
				}
			})
			.catch((error) => {
				console.error("Error deleting book:", error);
				message.error(
					`An error occurred while deleting book with ID ${bookId}`
				);
			});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Create a new book object
		const newBook = { title, author, genre };

		try {
			const response = await fetch("http://127.0.0.1:3000/book", {
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

			// Add the new book to the list of books
			setBooks([...books, newBook]);

			message.success("Book added successfully");
		} catch (error) {
			console.error("Error adding book:", error);
			message.error("Failed to add book");
		}
	};

	return (
		<div>
			<h1>Library Management System</h1>
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
			<h2>Library Books</h2>
			<Table dataSource={books} columns={columns} />
		</div>
	);
}

export default LibraryBooks;
