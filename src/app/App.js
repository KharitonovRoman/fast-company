import React, { useEffect, useState } from "react";
import UserList from "./components/userList";
import api from "../api";

function App() {
	const [users, setUsers] = useState();

	useEffect(() => {
		api.users.fetchAll().then((data) => {
			setUsers(data);
		});
	}, []);

	const handleDelete = (userId) => {
		setUsers((prevState) =>
			prevState.filter((user) => user._id !== userId)
		);
	};

	const handleToggleBookmark = (userId) => {
		setUsers((prevState) =>
			prevState.map((user) => {
				if (user._id === userId) {
					user = { ...user };
					user.isBookmarked = !user.isBookmarked;
				}
				return user;
			})
		);
	};

	return (
		<>
			{users && (
				<UserList
					allUsers={users}
					onDelete={handleDelete}
					onToggleBookmark={handleToggleBookmark}
				/>
			)}
		</>
	);
}

export default App;
