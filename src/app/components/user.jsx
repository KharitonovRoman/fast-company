import { React, useEffect, useState } from "react";
import userApi from "../../api";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const User = ({ id }) => {
	const [user, setUser] = useState();

	useEffect(() => {
		userApi.users.getById(id).then((data) => {
			setUser(data);
		});
	}, []);

	const history = useHistory();

	const handleGoToUserList = () => {
		history.push("/users");
	};

	if (user) {
		return (
			user && (
				<>
					<h2>{user.name}</h2>
					<h4>{`Профессия: ${user.profession.name}`}</h4>
					<p>{`Встретился, раз: ${user.completedMeetings}`}</p>
					<QualitiesList qualities={user.qualities} />
					<h4>{`Rate: ${user.rate}`}</h4>
					<button
						className="btn btn-primary"
						onClick={() => {
							handleGoToUserList();
						}}
					>
						Все пользователи
					</button>
				</>
			)
		);
	}

	return "Loading...";
};

User.propTypes = {
	id: PropTypes.string.isRequired
};

export default User;
