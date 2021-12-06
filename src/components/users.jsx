import React, { useState } from 'react';
import api from '../api';

const Users = () => {
	const [users, setUsers] = useState(api.users.fetchAll());
	const getTableBody = () => {
		return users.map((user) => (
			<tr key={user._id}>
				<th scope="row">{user.name}</th>
				<td>{getUserQualities(user)}</td>
				<td>{user.profession.name}</td>
				<td>{user.completedMeetings}</td>
				<td>{user.rate}</td>
				<td>
					<button
						className="btn btn-danger"
						onClick={() => {
							handleUserDelete(user._id);
						}}
					>
						Delete
					</button>
				</td>
			</tr>
		));
	};

	const getUserQualities = (user) => {
		return user.qualities.map((quality) => (
			<span key={quality._id} className={`badge bg-${quality.color} m-1`}>
				{quality.name}
			</span>
		));
	};

	const handleUserDelete = (userId) => {
		setUsers((prevState) =>
			prevState.filter((user) => user._id !== userId)
		);
	};

	const renderTableIfNeeded = () => {
		return users.length ? (
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Имя</th>
						<th scope="col">Качества</th>
						<th scope="col">Профессия</th>
						<th scope="col">Встретился, раз</th>
						<th scope="col">Оценка</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>{getTableBody()}</tbody>
			</table>
		) : (
			''
		);
	};

	const renderMessage = () => {
		let correctDeclension = 'человек тусанут';
		if (
			[2, 3, 4].includes(users.length % 10) &&
			Math.floor(users.length / 10) !== 1
		) {
			correctDeclension = 'человека тусанут';
		} else if (
			users.length % 10 === 1 &&
			Math.floor(users.length / 10) !== 1
		) {
			correctDeclension = 'человек тусанёт';
		}

		return users.length ? (
			<div className={`badge bg-primary m-2`}>
				{users.length} {correctDeclension} с тобой сегодня
			</div>
		) : (
			<div className={`badge bg-danger m-2`}>
				Никто с тобой не тусанёт сегодня
			</div>
		);
	};

	return (
		<>
			<h4>{renderMessage()}</h4>
			{renderTableIfNeeded()}
		</>
	);
};

export default Users;
