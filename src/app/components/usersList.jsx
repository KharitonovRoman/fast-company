import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import UserTable from "./userTable";
import PropTypes from "prop-types";
import api from "../../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import _ from "lodash";

const UsersList = () => {
	const pageSize = 8;
	const [currentPage, setCurrentPage] = useState(1);
	const [professions, setProfessions] = useState();
	const [selectedProf, setSelectedProf] = useState();
	const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

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

	useEffect(() => {
		api.professions.fetchAll().then((data) => {
			setProfessions(data);
		});
	}, []);

	useEffect(() => {
		setCurrentPage(1);
	}, [selectedProf]);

	const handleProfessionSelect = (item) => {
		setSelectedProf(item);
	};

	const handlePageChange = (pageIndex) => {
		setCurrentPage(pageIndex);
	};

	const handleSort = (item) => {
		setSortBy(item);
	};

	if (users) {
		const filteredUsers = selectedProf
			? users.filter((user) => user.profession._id === selectedProf._id)
			: users;

		const sortedUsers = _.orderBy(
			filteredUsers,
			[sortBy.path],
			[sortBy.order]
		);

		const usersCrop = paginate(sortedUsers, currentPage, pageSize);
		const userCount = filteredUsers.length;

		const clearFilter = () => {
			setSelectedProf();
		};

		return (
			<div className="d-flex">
				{professions && (
					<div className="d-flex flex-column flex-shrink-0 p-3">
						<GroupList
							selectedItem={selectedProf}
							items={professions}
							onItemSelect={handleProfessionSelect}
						/>
						<button
							className="btn btn-secondary mt-2"
							onClick={clearFilter}
						>
							Сбросить фильтр
						</button>
					</div>
				)}
				<div className="d-flex flex-column">
					<SearchStatus length={userCount} />
					{userCount > 0 && (
						<UserTable
							users={usersCrop}
							onSort={handleSort}
							selectedSort={sortBy}
							onDelete={handleDelete}
							onToggleBookmark={handleToggleBookmark}
						/>
					)}
					<div className="d-flex justify-content-center">
						<Pagination
							itemsCount={userCount}
							pageSize={pageSize}
							onPageChange={handlePageChange}
							currentPage={currentPage}
						/>
					</div>
				</div>
			</div>
		);
	}
	return "Loading...";
};

UsersList.propTypes = {
	users: PropTypes.arrayOf(PropTypes.object)
};

export default UsersList;
