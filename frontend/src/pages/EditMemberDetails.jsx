import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate

const EditMemberDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate(); // Use useNavigate for navigation
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
	}, [id]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setMember({ ...member, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch(`http://localhost:3000/member/edit/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(member),
		})
			.then((response) => response.json())
			.then(() => {
                // Handle success or error responses from the backend
                // You can add a success message or navigate to the member details page
                navigate(`/member/${id}`); // Use navigate to go to the member details page
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
						placeholder={member.name}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label>Age:</label>
					<input
						type="number"
						name="age"
						placeholder={member.age}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label>Role:</label>
					<input
						type="text"
						name="role"
						placeholder={member.role}
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
