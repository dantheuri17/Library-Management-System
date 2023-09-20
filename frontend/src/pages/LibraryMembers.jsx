// LibraryMembers.js

import { useState } from "react";
import MemberForm from "../components/MemberForm";
import MemberList from '../components/MemberList';

function LibraryMembers() {
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
			<MemberList /> 
		</div>
	);
}

export default LibraryMembers;
