



// MemberForm.js

import { useState } from "react";

// eslint-disable-next-line react/prop-types
function MemberForm({ onAddMember }) {
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [role, setRole] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Create a new member object
		const newMember = { name, age, role };

		try {
			const response = await fetch("http://127.0.0.1:3000/member", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newMember),
			});

			if (!response.ok) {
				throw new Error("Failed to add member");
			}

			// Clear the form fields
			setName("");
			setAge("");
			setRole("");

			// Optionally, you can fetch updated member data or perform other actions
			// after adding the member.

			// Call a callback function or update state in your parent component if needed.
			onAddMember(newMember);
		} catch (error) {
			console.error("Error adding member:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
			<input
				type="number"
				placeholder="Age"
				value={age}
				onChange={(e) => setAge(e.target.value)}
				required
			/>
			<input
				type="text"
				placeholder="Role"
				value={role}
				onChange={(e) => setRole(e.target.value)}
				required
			/>
			<button type="submit">Add Member</button>
		</form>
	);
}

export default MemberForm;
