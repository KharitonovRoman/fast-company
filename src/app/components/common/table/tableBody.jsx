import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Link } from "react-router-dom";

const TableBody = ({ data, columns }) => {
	const renderContent = (item, column) => {
		let content = "";
		if (columns[column].component) {
			const component = columns[column].component;
			if (typeof component === "function") {
				return component(item);
			}
			content = component;
		}
		content = _.get(item, columns[column].path);

		if (columns[column].link) {
			const link = _.get(item, columns[column].link);
			content = <Link to={`users/${link}`}>{content}</Link>;
		}

		return content;
	};

	return (
		<tbody>
			{data.map((item) => (
				<tr key={item._id}>
					{Object.keys(columns).map((column) => (
						<td key={column}>{renderContent(item, column)}</td>
					))}
				</tr>
			))}
		</tbody>
	);
};

TableBody.propTypes = {
	data: PropTypes.array.isRequired,
	columns: PropTypes.object.isRequired
};

export default TableBody;
