import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
	label,
	value,
	onChange,
	defaultOption,
	options,
	name,
	error
}) => {
	const handleChange = ({ target }) => {
		console.log("hct", target);
		onChange(target);
	};

	const getInputClasses = () => {
		return "form-control" + (error ? " is-invalid" : "");
	};

	const optionsArray =
		!Array.isArray(options) && typeof options === "object"
			? Object.keys(options).map((optionName) => ({
					name: options[optionName].name,
					value: options[optionName]._id
			  }))
			: options;

	return (
		<div className="mb-4">
			<label htmlFor={name} className="form-label">
				{label}
			</label>
			<select
				className={getInputClasses()}
				id={name}
				name={name}
				value={value}
				onChange={handleChange}
			>
				<option>{defaultOption}</option>
				{optionsArray &&
					optionsArray.map((option) => (
						<option key={option._id} value={option._id}>
							{option.name}
						</option>
					))}
			</select>
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

SelectField.propTypes = {
	defaultOption: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	error: PropTypes.string,
	options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default SelectField;
