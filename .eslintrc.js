module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ["plugin:react/recommended", "standard"],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 13,
		sourceType: "module"
	},
	plugins: ["react"],
	rules: {
		indent: "off",
		"no-tabs": 0,
		semi: ["error", "always"],
		"space-before-function-paren": [
			"error",
			{ anonymous: "always", named: "never" }
		],
		quotes: ["error", "double", { allowTemplateLiterals: true }],
		"multiline-ternary": "off",
		"no-mixed-spaces-and-tabs": "off"
	}
};
