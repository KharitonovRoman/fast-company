import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import api from "../../../api/";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
		profession: "",
		sex: "male",
		qualities: [],
		licence: false
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
		email: {
			isRequired: {
				message: "Электронная почта обязательна для заполнения"
			},
			isEmail: {
				message: "Электронная почта введена не корректна"
			}
		},
		password: {
			isRequired: {
				message: "Пароль обязателен для заполнения"
			},
			isCapital: {
				message:
					"Пароль должен содержать как минимум одну заглавную букву"
			},
			isContainDigit: {
				message: "Пароль должен содержать как минимум одну цифру"
			},
			min: {
				message: "Пароль должен состоять как минимум из 8 символов",
				value: 8
			}
		},
		profession: {
			isRequired: {
				message: "Профессия обязательна для заполнения"
			}
		},
		licence: {
			isRequired: {
				message:
					"Вы не можете использоваться наш сервис без подверждения лицензионного соглашения"
			}
		}
	};

	useEffect(() => {
		validate();
	}, [data]);

	const validate = () => {
		const errors = validator(data, validatorConfig);
		console.log(errors);
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

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				label="Электронная почта"
				name="email"
				value={data.email}
				error={errors.email}
				onChange={handleChange}
			/>
			<TextField
				type="password"
				label="Пароль"
				name="password"
				value={data.password}
				error={errors.password}
				onChange={handleChange}
			/>

			<SelectField
				label="Выберите вашу профессию"
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
				options={qualities}
				name="qualities"
				onChange={handleChange}
				defaultValue={data.qualities}
				label="Выберите ваши качества"
			/>

			<CheckBoxField
				name="licence"
				value={data.licence}
				error={errors.licence}
				onChange={handleChange}
			>
				Подтвердить <a>лицензионное соглашение</a>
			</CheckBoxField>

			<button
				type="submit"
				disabled={!isValid}
				className="btn btn-primary w-100 mx-auto"
			>
				Отправить
			</button>
		</form>
	);
};

export default RegisterForm;
