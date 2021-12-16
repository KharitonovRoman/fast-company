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
		indent: ["error", 4],
		translate_tabs_to_spaces: false,
		semi: [2, "always"],
		"space-before-function-paren": ["error", "never"],
		quotes: ["error", "double", { allowTemplateLiterals: true }],
		"multiline-ternary": ["error", "never"]
	}
};
