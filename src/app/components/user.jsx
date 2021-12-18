import React from "react";
import Quality from "./quality";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ user, ...rest }) => {
	const getUserQualities = (user) => {
		return user.qualities.map((quality) => (
			<Quality
				key={quality._id}
				color={quality.color}
				name={quality.name}
			/>
		));
	};

	return (
		<tr>
			<th scope="row">{user.name}</th>
			<td>{getUserQualities(user)}</td>
			<td>{user.profession.name}</td>
			<td>{user.completedMeetings}</td>
			<td>{user.rate}</td>
			<td>
				<Bookmark
					status={user.isBookmarked}
					userId={user._id}
					onToggleBookmark={rest.onToggleBookmark}
				/>
			</td>
			<td>
				<button
					className="btn btn-danger"
					onClick={() => rest.onDelete(user._id)}
				>
					Delete
				</button>
			</td>
		</tr>
	);
};

User.propTypes = {
	user: PropTypes.object.isRequired
};

export default User;
