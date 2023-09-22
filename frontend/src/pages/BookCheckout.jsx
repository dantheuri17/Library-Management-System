import { useState } from "react";
import {Link} from "react-router-dom";

function BookCheckout() {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [loading, setLoading] = useState(false); 

	const handleMemberSearch = async () => {
		try {
			setLoading(true); 

		

			const response = await fetch(
				`http://localhost:3000/member/searchMember?query=${searchQuery}`
			);

			if (!response.ok) {
				throw new Error("Failed to search for members");
			}

			const searchResults = await response.json();
			setSearchResults(searchResults);
		} catch (error) {
			console.error("Error searching for members:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h2>Member Search</h2>
			<input
				type="text"
				placeholder="Enter member name"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			<button onClick={handleMemberSearch}>Search</button>

			
			{loading && <p>Loading...</p>}

			
			<ul>
				{searchResults.map((member) => (
					<li key={member._id}>
						<Link to={`/MemberBookCheckout/${member._id}`}>{member.name}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default BookCheckout;
