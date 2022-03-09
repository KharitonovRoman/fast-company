import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserEditPage from "../components/page/userEditPage";

const Users = () => {
	const params = useParams();
	const userId = params.userId;
	const edit = params.edit;
	console.log(params);

	return (
		<>
			{userId ? (
				edit ? (
					<UserEditPage id={userId} />
				) : (
					<UserPage id={userId} />
				)
			) : (
				<UsersListPage />
			)}
		</>
	);
};

export default Users;
