import { React } from "react";
import PropTypes from "prop-types";
import UserForm from "../../ui/userForm";

const UserEditPage = () => {
	/* const history = useHistory();

	const handleUserSave = () => {
		history.push("/users");
	}; */

	return (
		<div className="container mt-5">
			<div className="row">
				<div className=".col-md-6 .offset-md-3 shadow p-4">
					<UserForm />
				</div>
			</div>
		</div>
	);
};

UserEditPage.propTypes = {
	id: PropTypes.string.isRequired
};

export default UserEditPage;
