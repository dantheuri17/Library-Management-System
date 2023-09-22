import { useState, useEffect } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";

function LibraryMembers() {
	const [members, setMembers] = useState([]);
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [role, setRole] = useState("");

	useEffect(() => {
		fetch("http://localhost:3000/members")
			.then((response) => response.json())
			.then((data) => {
				// Update the state with the fetched members
				setMembers(data);
			})
			.catch((error) => {
				console.error("Error fetching members:", error);
			});
	}, []);

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
		{
			title: "Actions",
			dataIndex: "actions",
			key: "actions",
			render: (text, record) => (
				<Popconfirm
					title="Are you sure you want to delete this member?"
					onConfirm={() => handleDeleteMember(record._id)}
					okText="Yes"
					cancelText="No"
				>
					<Button type="danger">Delete</Button>
				</Popconfirm>
			),
		},
	];

	const handleDeleteMember = (memberId) => {
		fetch(`http://localhost:3000/member/delete/${memberId}`, {
			method: "DELETE",
		})
			.then((response) => {
				if (response.ok) {
					setMembers(members.filter((member) => member._id !== memberId));
					message.success(`Member with ID ${memberId} deleted successfully`);
				} else {
					message.error(`Failed to delete member with ID ${memberId}`);
				}
			})
			.catch((error) => {
				console.error("Error deleting member:", error);
				message.error(
					`An error occurred while deleting member with ID ${memberId}`
				);
			});
	};

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

			// Add the new member to the list of members
			setMembers([...members, newMember]);

			message.success("Member added successfully");
		} catch (error) {
			console.error("Error adding member:", error);
			message.error("Failed to add member");
		}
	};

	return (
		<div>
			<h1>Library Management System</h1>
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
			<h2>Library Members</h2>
			<Table dataSource={members} columns={columns} />
		</div>
	);
}

export default LibraryMembers;
