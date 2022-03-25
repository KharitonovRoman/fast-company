import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, userId, onToggleBookmark }) => {
	return (
		<button
			className="btn btn-secondary"
			onClick={() => {
				onToggleBookmark(userId);
			}}
		>
			<i className={`bi bi-bookmark${status ? "-fill" : ""}`}></i>
		</button>
	);
};

Bookmark.propTypes = {
	status: PropTypes.bool,
	userId: PropTypes.string.isRequired,
	onToggleBookmark: PropTypes.func.isRequired
};

export default Bookmark;
