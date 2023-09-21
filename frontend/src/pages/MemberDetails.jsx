import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const MemberDetails = () => {
	const { id } = useParams(); // Get the member ID from the URL
	const [member, setMember] = useState(null);

	useEffect(() => {
		// Fetch member details from your MongoDB backend using the extracted ID
		fetch(`http://localhost:3000/member/${id}`) // Replace with your API endpoint
			.then((response) => response.json())
			.then((data) => {
				// Update the state with the fetched member details
				setMember(data);
			})
			.catch((error) => {
				console.error("Error fetching member details:", error);
			});
	}, [id]); // Include id in the dependency array to fetch member details when it changes

	return (
		<div>
			{member ? (
				<div>
					<h2>Member Details</h2>
					<p>Name: {member.name}</p>
					<p>Age: {member.age}</p>
					<p>Role: {member.role}</p>
					{/* Display other member details here */}
					<Link to={`/member/edit/${id}`}>Edit Member</Link>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
};

export default MemberDetails;
