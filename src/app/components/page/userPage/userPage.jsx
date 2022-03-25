import { React, useEffect, useState } from "react";
import userApi from "../../../../api";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";

const UserPage = ({ id }) => {
	const [user, setUser] = useState();

	useEffect(() => {
		userApi.users.getById(id).then((data) => setUser(data));
	}, []);

	const history = useHistory();

	const handleGoToUserList = () => {
		history.push("/users");
	};

	const handleGoToUserEdit = (userId) => {
		history.push(`/users/${userId}/edit`);
	};

	if (user) {
		return (
			user && (
				<>
					<h2>{user.name}</h2>
					<h4>{`Профессия: ${user.profession.name}`}</h4>
					<p>{`Встретился, раз: ${user.completedMeetings}`}</p>
					<Qualities qualities={user.qualities} />
					<h4>{`Rate: ${user.rate}`}</h4>
					<button
						className="btn btn-outline-primary m-2"
						onClick={() => {
							handleGoToUserList();
						}}
					>
						Назад
					</button>
					<button
						className="btn btn-primary m-2"
						onClick={() => {
							handleGoToUserEdit(user._id);
						}}
					>
						Изменить
					</button>
				</>
			)
		);
	}

	return "Loading...";
};

UserPage.propTypes = {
	id: PropTypes.string.isRequired
};

export default UserPage;
