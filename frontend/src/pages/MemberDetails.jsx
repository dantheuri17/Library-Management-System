import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const MemberDetails = () => {
	const { id } = useParams(); 
	const navigate = useNavigate(); 
	const [member, setMember] = useState(null);
	

	useEffect(() => {
		
		fetch(`http://localhost:3000/member/${id}`) 
			.then((response) => response.json())
			.then((data) => {
				// Update the state with the fetched member details
				setMember(data);
			})
			.catch((error) => {
				console.error("Error fetching member details:", error);
			});
	}, [id]); 

		const handleCheckoutClick = () => {
			// Navigate to the checkout page, passing the member ID as a URL parameter
			navigate(`/check-out/${id}`);
		};

	return (
		<div>
			{member ? (
				<div>
					<h2>Member Details</h2>
					<p>Name: {member.name}</p>
					<p>Age: {member.age}</p>
					<p>Role: {member.role}</p>
					
					<Link to={`/member/edit/${id}`}>Edit Member</Link>
				</div>
			) : (
				<div>Loading...</div>
			)}

			<button onClick={handleCheckoutClick}>Checkout</button>
		</div>
	);
};

export default MemberDetails;
