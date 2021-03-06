import React from "react";
import Table from "../common/table";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import Qualities from "./qualities";

const UserTable = ({
	users,
	onSort,
	selectedSort,
	onToggleBookmark,
	onDelete
}) => {
	const columns = {
		name: { path: "name", name: "Имя", link: "_id" },
		qualities: {
			name: "Качества",
			component: (user) => <Qualities qualities={user.qualities} />
		},
		profession: { path: "profession.name", name: "Профессия" },
		completedMeetings: {
			path: "completedMeetings",
			name: "Встретился, раз"
		},
		rate: { path: "rate", name: "Оценка" },
		isBookmarked: {
			path: "isBookmarked",
			name: "Избранное",
			component: (user) => (
				<Bookmark
					status={user.isBookmarked}
					userId={user._id}
					onToggleBookmark={onToggleBookmark}
				/>
			)
		},
		delete: {
			component: (user) => (
				<button
					className="btn btn-danger"
					onClick={() => onDelete(user._id)}
				>
					Delete
				</button>
			)
		}
	};

	return (
		<Table
			onSort={onSort}
			selectedSort={selectedSort}
			columns={columns}
			data={users}
		></Table>
	);
};

UserTable.propTypes = {
	users: PropTypes.array.isRequired,
	onSort: PropTypes.func.isRequired,
	selectedSort: PropTypes.object.isRequired,
	onToggleBookmark: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired
};

export default UserTable;
