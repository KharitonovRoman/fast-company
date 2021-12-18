import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import PropTypes from "prop-types";
import api from "../../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";

const UserList = ({ allUsers, ...rest }) => {
	const pageSize = 2;
	const [currentPage, setCurrentPage] = useState(1);
	const [professions, setProfessions] = useState();
	const [selectedProf, setSelectedProf] = useState();

	useEffect(() => {
		api.professions.fetchAll().then((data) => {
			console.log(data);
			setProfessions(data);
		});
	}, []);

	useEffect(() => {
		setCurrentPage(1);
	}, [selectedProf]);

	const handleProfessionSelect = (item) => {
		console.log(item);
		setSelectedProf(item);
	};

	const handlePageChange = (pageIndex) => {
		setCurrentPage(pageIndex);
	};

	const filteredUsers = selectedProf
		? allUsers.filter((user) => user.profession._id === selectedProf._id)
		: allUsers;
	const userCrop = paginate(filteredUsers, currentPage, pageSize);

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
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Имя</th>
								<th scope="col">Качества</th>
								<th scope="col">Профессия</th>
								<th scope="col">Встретился, раз</th>
								<th scope="col">Оценка</th>
								<th scope="col">Избранное</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
							{userCrop.map((user) => (
								<User key={user._id} user={user} {...rest} />
							))}
						</tbody>
					</table>
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
};

UserList.propTypes = {
	allUsers: PropTypes.arrayOf(PropTypes.object)
};

export default UserList;
