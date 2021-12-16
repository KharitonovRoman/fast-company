import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
	let correctDeclension = "человек тусанут";

	if ([2, 3, 4].includes(length % 10) && Math.floor(length / 10) !== 1) {
		correctDeclension = "человека тусанут";
	} else if (length % 10 === 1 && Math.floor(length / 10) !== 1) {
		correctDeclension = "человек тусанёт";
	}

	return length ? (
		<div className={`badge bg-primary m-2`}>
			{length} {correctDeclension} с тобой сегодня
		</div>
	) : (
		<div className={`badge bg-danger m-2`}>
			Никто с тобой не тусанёт сегодня
		</div>
	);
};

SearchStatus.propTypes = {
	length: PropTypes.number.isRequired
};

export default SearchStatus;
