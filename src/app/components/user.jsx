import React from 'react';
import Quality from './quality';
import Bookmark from './bookmark';

const User = ({ user, ...rest }) => {
	const getUserQualities = (user) => {
		return user.qualities.map((quality) => (
			<Quality key={quality._id} {...quality} />
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
					onToggleBookmark={rest.onToggleBookmark}
					userId={user._id}
				/>
			</td>
			<td>
				<button
					className="btn btn-danger"
					onClick={() => {
						rest.onDelete(user._id);
					}}
				>
					Delete
				</button>
			</td>
		</tr>
	);
};

export default User;
