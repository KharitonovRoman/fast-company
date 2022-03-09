import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import api from "../../../api/";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelect";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const UserForm = ({ user }) => {
	console.log("user", user);
	const [data, setData] = useState({
		name: user.name,
		email: user.email,
		profession: user.profession._id,
		sex: user.sex,
		qualities: user.qualities.map((quality) => ({
			label: quality.name,
			value: quality._id
		}))
	});
	const [professions, setProfessions] = useState();
	const [qualities, setQualities] = useState({});
	const [errors, setErrors] = useState({});

	useEffect(() => {
		api.professions.fetchAll().then((data) => setProfessions(data));
		api.qualities.fetchAll().then((data) => setQualities(data));
	}, []);

	const handleChange = (target) => {
		setData((prevState) => ({
			...prevState,
			[target.name]: target.value
		}));
	};

	const validatorConfig = {
		/* profession: {
			isRequired: {
				message: "Профессия обязательна для заполнения"
			}
		} */
	};

	useEffect(() => {
		validate();
	}, [data]);

	const validate = () => {
		const errors = validator(data, validatorConfig);
		console.log("errors", errors);
		setErrors(errors);

		return Object.keys(errors).length === 0;
	};

	const isValid = Object.keys(errors).length === 0;

	const handleSubmit = (e) => {
		e.preventDefault();
		const isValid = validate();
		if (!isValid) {
			return;
		}
		console.log(data);
	};

	const history = useHistory();

	const updateUser = (userId, data) => {
		data = {
			...data,
			profession: {
				_id: data.profession,
				name: professions.find(
					(profession) => profession._id === data.profession
				).name
			},
			qualities: data.qualities.map((userQuality) => ({
				_id: userQuality.value,
				name: userQuality.label,
				color: qualities[
					Object.keys(qualities).find(
						(quality) =>
							qualities[quality]._id === userQuality.value
					)
				].color
			}))
		};
		api.users.update(userId, data);
		history.push(`/users/${userId}`);
	};

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				label="Имя"
				name="name"
				value={data.name}
				error={errors.name}
				onChange={handleChange}
			/>

			<TextField
				label="Электронная почта"
				name="email"
				value={data.email}
				error={errors.email}
				onChange={handleChange}
			/>

			<SelectField
				label="Профессия"
				defaultOption="Choose..."
				name="profession"
				options={professions}
				value={data.profession}
				error={errors.profession}
				onChange={handleChange}
			/>

			<RadioField
				options={[
					{ name: "Male", value: "male" },
					{ name: "Female", value: "female" },
					{ name: "Other", value: "other" }
				]}
				value={data.sex}
				name="sex"
				onChange={handleChange}
				label="Выберите ваш пол"
			/>

			<MultiSelectField
				label="Качества"
				name="qualities"
				options={qualities}
				defaultValue={data.qualities}
				onChange={handleChange}
			/>

			<button
				type="submit"
				disabled={!isValid}
				className="btn btn-primary w-100 mx-auto"
				onClick={() => updateUser(user._id, data)}
			>
				Сохранить
			</button>
		</form>
	);
};

UserForm.propTypes = {
	user: PropTypes.object
};

export default UserForm;
