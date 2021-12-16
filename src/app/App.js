import React, { useState } from "react";
import UserList from "./components/userList";
import SearchStatus from "./components/searchStatus";
import api from "../api/index";

function App() {
	const [users, setUsers] = useState(api.users.fetchAll());

	const handleDelete = (userId) => {
		setUsers((prevState) =>
			prevState.filter((user) => user._id !== userId)
		);
	};

	const handleToggleBookmark = (id) => {
		setUsers((prevState) =>
			prevState.map((user) => {
				if (user._id === id) {
					user = { ...user };
					user.isBookmarked = !user.isBookmarked;
				}
				return user;
			})
		);
	};

	return (
		<>
			<SearchStatus length={users.length} />
			<UserList
				users={users}
				onDelete={handleDelete}
				onToggleBookmark={handleToggleBookmark}
			/>
		</>
	);
}

export default App;
