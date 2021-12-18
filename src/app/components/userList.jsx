import React, { useState } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import PropTypes from "prop-types";

const UserList = ({ users, ...rest }) => {
	const userCount = users.length;
	const pageSize = 4;
	const [currentPage, setCurrentPage] = useState(1);

	const handlePageChange = (pageIndex) => {
		setCurrentPage(pageIndex);
	};

	const userCrop = paginate(users, currentPage, pageSize);

	return (
		<>
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

			<Pagination
				itemsCount={userCount}
				pageSize={pageSize}
				onPageChange={handlePageChange}
				currentPage={currentPage}
			/>
		</>
	);
};

UserList.propTypes = {
	users: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default UserList;
