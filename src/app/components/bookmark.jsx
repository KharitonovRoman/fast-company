import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, ...rest }) => {
	return (
		<button
			className="btn btn-secondary"
			onClick={() => {
				rest.onToggleBookmark(rest.userId);
			}}
		>
			<i className={`bi bi-bookmark${status ? "-heart-fill" : ""}`}></i>
		</button>
	);
};

Bookmark.propTypes = {
	status: PropTypes.string.isRequired
};

export default Bookmark;
