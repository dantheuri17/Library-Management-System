import { useState, useEffect } from "react";
import { Button, message } from "antd";

const MemberBookCheckout = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [cart, setCart] = useState([]);

	// Function to handle book search
	const handleSearch = async () => {
		const response = await fetch(
			`http://localhost:3000/book/search?query=${searchTerm}`
		);

		if (!response.ok) {
			throw new Error("Failed to search for books");
		}

		const filteredResults = await response.json();

		setSearchResults(filteredResults);
	};

	const addToCart = (book) => {
		setCart([...cart, book]);
    
	};

	const handleCheckout = async () => {
		try {
			const response = await fetch("http://localhost:3000/check-out", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(cart),
			});

      if(!response.ok) {
        throw new Error("Failed to Checkout Books"); 
      }

		} catch (error) {
      console.log("Error Checking Out Books", error); 
      message.error("Failed to add Book");
    }
	};

	useEffect(() => {
		console.log(cart);
	}, [cart]);

	return (
		<div>
			<h1>Member Book Checkout</h1>
			<div>
				<input
					type="text"
					placeholder="Search for books..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<button onClick={handleSearch}>Search</button>
			</div>
			<div>
				<h2>Search Results</h2>
				<ul>
					{searchResults.map((book) => (
						<li key={book.id}>
							{book.title} by {book.author}{" "}
							<button onClick={() => addToCart(book)}>Add to Cart</button>
						</li>
					))}
				</ul>
			</div>
			<div>
				<h2>Checkout Cart</h2>
				<ul>
					{cart.map((book) => (
						<li key={book.id}>
							{book.title} by {book.author}
						</li>
					))}
				</ul>
			</div>
			<div>
				<Button onClick={handleCheckout} type="primary">
					Checkout Books
				</Button>
			</div>
		</div>
	);
};

export default MemberBookCheckout;
