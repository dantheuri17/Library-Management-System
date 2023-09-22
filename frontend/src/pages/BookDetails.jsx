import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const BookDetails = () => {
	const { id } = useParams(); // Get the book ID from the URL
	const [book, setBook] = useState(null);

	useEffect(() => {

		fetch(`http://localhost:3000/book/${id}`) // Replace with your API endpoint
			.then((response) => response.json())
			.then((data) => {

				setBook(data);
			})
			.catch((error) => {
				console.error("Error fetching book details:", error);
			});
	}, [id]); 

	return (
		<div>
			{book ? (
				<div>
					<h2>Book Details</h2>
					<p>Title: {book.title}</p>
					<p>Author: {book.author}</p>
					<p>Genre: {book.genre}</p>
					{/* Display other book details here */}
					<Link to={`/book/edit/${id}`}>Edit Book</Link>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
};

export default BookDetails;
