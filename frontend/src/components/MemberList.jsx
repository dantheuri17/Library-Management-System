import { useState, useEffect } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";


function MemberList() {
	const [members, setMembers] = useState([]);

	useEffect(() => {
		// Fetch members from your MongoDB backend
		fetch("http://localhost:3000/members") // Replace with your API endpoint
			.then((response) => response.json())
			.then((data) => {
				// Update the state with the fetched members
				setMembers(data);
			})
			.catch((error) => {
				console.error("Error fetching members:", error);
			});
	}, []);

	// Define columns for the table
	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (text, record) => (
				<Link to={`/member/${record._id}`}>{text}</Link>
			),
		},
		{
			title: "Age",
			dataIndex: "age",
			key: "age",
			render: (text, record) => (
				<Link to={`/member/${record._id}`}>{text}</Link>
			),
		},
		{
			title: "Role",
			dataIndex: "role",
			key: "role",
			render: (text, record) => (
				<Link to={`/member/${record._id}`}>{text}</Link>
			),
		},
	];

	return (
		<div>
			<h2>Library Members</h2>
			<Table dataSource={members} columns={columns} />
		</div>
	);
}

export default MemberList;
