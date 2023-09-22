import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditBookDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [book, setBook] = useState({
		title: "",
		author: "",
		ISBN: "",
	});

	useEffect(() => {
		fetch(`http://localhost:3000/book/${id}`)
			.then((response) => response.json())
			.then((data) => {
				setBook(data);
			})
			.catch((error) => {
				console.error("Error fetching book details:", error);
			});
	}, [id]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setBook({ ...book, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch(`http://localhost:3000/book/edit/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(book),
		})
			.then((response) => response.json())
			.then(() => {
				// Handle success or error responses from the backend
				// You can add a success message or navigate to the book details page
				navigate(`/book/${id}`);
			})
			.catch((error) => {
				console.error("Error updating book details:", error);
			});
	};

	return (
		<div>
			<h2>Edit Book Details</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Title:</label>
					<input
						type="text"
						name="title"
						placeholder={book.title}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label>Author:</label>
					<input
						type="text"
						name="author"
                        placeholder={book.author}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label>Genre:</label>
					<input
						type="text"
						name="genre"
						placeholder={book.genre}
						onChange={handleInputChange}
					/>
				</div>
				{/* Add input fields for other book details here */}
				<div>
					<button type="submit">Save</button>
				</div>
			</form>
		</div>
	);
};

export default EditBookDetails;
