// MemberForm.js

import { useState } from "react";

// eslint-disable-next-line react/prop-types
function MemberForm({ onAddMember }) {
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [role, setRole] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// Create a new member object
		const newMember = { name, age, role };
		// Pass the new member data to the parent component
		onAddMember(newMember);
		// Clear the form fields
		setName("");
		setAge("");
		setRole("");
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
