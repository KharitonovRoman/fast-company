import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";

const LoginForm = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
		stayOn: false
	});

	const [errors, setErrors] = useState({});

	const handleChange = (target) => {
		console.log("target l", target);
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
			<CheckBoxField
				name="stayOn"
				value={data.stayOn}
				onChange={handleChange}
			>
				Оставаться в системе
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

export default LoginForm;
