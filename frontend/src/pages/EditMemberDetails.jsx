import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const EditMemberDetails = () => {
	const { id } = useParams(); // Get the member ID from the URL
	const history = useHistory();
	const [member, setMember] = useState({
		name: "",
		age: "",
		role: "",
	});

	useEffect(() => {
		
		fetch(`http://localhost:3000/member/${id}`) 
			.then((response) => response.json())
			.then((data) => {
				setMember(data);
			})
			.catch((error) => {
				console.error("Error fetching member details:", error);
			});
	}, [id]); // Include id in the dependency array to fetch member details when it changes

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setMember({ ...member, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Send updated member details to your backend for saving
		fetch(`http://localhost:3000/member/edit/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(member),
		})
			.then((response) => response.json())
			.then((data) => {
				// Handle success or error responses from the backend
				// You can add a success message or redirect to the member details page
				history.push(`/member/${id}`);
			})
			.catch((error) => {
				console.error("Error updating member details:", error);
			});
	};

	return (
		<div>
			<h2>Edit Member Details</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Name:</label>
					<input
						type="text"
						name="name"
						value={member.name}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label>Age:</label>
					<input
						type="number"
						name="age"
						value={member.age}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label>Role:</label>
					<input
						type="text"
						name="role"
						value={member.role}
						onChange={handleInputChange}
					/>
				</div>
				{/* Add input fields for other member details here */}
				<div>
					<button type="submit">Save</button>
				</div>
			</form>
		</div>
	);
};

export default EditMemberDetails;
