import { React, useEffect, useState } from "react";
import userApi from "../../../../api";
import PropTypes from "prop-types";
import UserForm from "../../ui/userForm";

const UserEditPage = ({ id }) => {
	const [user, setUser] = useState();

	useEffect(() => {
		userApi.users.getById(id).then((data) => setUser(data));
	}, []);

	/* const history = useHistory();

	const handleUserSave = () => {
		history.push("/users");
	}; */

	if (user) {
		return (
			<div className="container mt-5">
				<div className="row">
					<div className=".col-md-6 .offset-md-3 shadow p-4">
						{user && <UserForm user={user} />}
					</div>
				</div>
			</div>
		);
	}

	return "Loading...";
};

UserEditPage.propTypes = {
	id: PropTypes.string.isRequired
};

export default UserEditPage;
