// Library.js

import { useState } from "react";
import MemberForm from "../components/MemberForm";

function Library() {
	const [members, setMembers] = useState([]);

	const addMember = (newMember) => {
		// Add the new member to the list of members
		setMembers([...members, newMember]);
	};

	return (
		<div className="Library">
			<h1>Library Management System</h1>
			<MemberForm onAddMember={addMember} />
			<h2>Library Members</h2>
			<ul>
				{members.map((member, index) => (
					<li key={index}>
						Name: {member.name}, Age: {member.age}, Role: {member.role}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Library;
